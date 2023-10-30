import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import {join} from 'path';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import {
  findStudents,
  addStudent,
  findStudentById,
  findStudentByIdAndUpdate,
  findStudentByIdAndDelete,
  findStudentByEmail
} from './student.services';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';

/**
 * get all students ( staff , admin can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getStudents = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findStudents();
    return res.status(200).send({success: true, data: student || 'no student available'});
  } catch (error) {
    next(error);
  }
};

/**
 * create new student ( staff , admin can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const createStudent = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await addStudent(req.body);
    return res.status(200).send({success: true, data: student});
  } catch (error) {
    logger.error(`Error in add STUDENT = ${error}`);
    next(error);
  }
};

/**
 * get 1 student by id ( staff , admin can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getStudentById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findStudentById(req.params.id);
    return res.status(200).send({success: true, data: student});
  } catch (error) {
    next(error);
  }
};

/**
 * find student by id & update only password field ( student can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getStudentAndUpdate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];
    const student = await findStudentByIdAndUpdate(_id);

    logger.info(student);

    if (!req.body.password) {
      logger.error(`you can update only password field.`);
      throw customError(400, 'you can update only password field. ');
    }

    student.password = req.body.password;

    await student.save();

    return res.status(200).send({success: true, data: student});
  } catch (error) {
    logger.error(`Error in updating Password ${error}`);
    next(error);
  }
};

/**
 * find student by id & delete ( staff , admin can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getStudentByIdAndDelete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findStudentByIdAndDelete(req.params.id);

    logger.info(`${student.name} is now deleted from database`);

    return res.status(200).send({success: true, data: student || 'no student available'});
  } catch (error) {
    logger.error(`Error in deleting student ${error}`);
    next(error);
  }
};

/**
 * student login ( any one can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const studentLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const student = await findStudentByEmail(req.body.email);

    const did_Password_Match = await bcrypt.compare(req.body.password, student.password);

    if (!did_Password_Match) {
      throw customError(401, 'Please enter valid authentication credentials');
    }

    // __dirname = Desktop/ERP/ERP-Project/src  ( current directory )
    const privateKey = fs.readFileSync(join(__dirname, '../../../keys/private.key')); // joining path of current drectory to private.keys
    const token = jwt.sign({_id: student._id.toString(), role: student.role}, privateKey, {algorithm: 'RS256'}); // jwt.sign( payload(object) , private key , options(which algorithm we are using in object))
    // When above code is executed, it generates a JWT with the provided payload and signs it using the secret key.

    student.authToken = token;
    await student.save();
    return res.status(200).send({success: true, data: student || 'no student available'});
  } catch (error) {
    logger.error(`Error in Login ${error}`);
    next(error);
  }
};

/**
 * student logout ( who is login )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const studentLogout = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];

    const student = await findStudentById(_id);
    if (!student) {
      throw customError(204, 'Student not found');
    }

    student.authToken = undefined;
    await student.save();
    return res.status(200).send({success: true, data: student});
  } catch (error) {
    logger.error(`Error while logout a student: ${error}`);
    next(error);
  }
};

/**
 * myself ( who is login )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const myself = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];

    const student = await findStudentById(_id);

    return res.status(200).send({success: true, data: student || 'Student not found'});
  } catch (error) {
    logger.error(`Error in getting myself: ${error}`);
    next(error);
  }
};

// eslint-disable-next-line prettier/prettier
/**
 * find student by id & update any field ( admin , staff can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getStudentByIdAndUpdateAll = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const student = await findStudentByIdAndUpdate(req.params.id);

    logger.info(`old student = ${student}`);

    for (const i in req.body) {
      student[i] = req.body[i];
    }

    logger.info(`updated student = ${student}`);

    await student.save();

    return res.status(200).send({success: true, data: student || 'no student available'});
  } catch (error) {
    logger.error(`Error in update ${error}`);
    next(error);
  }
};
