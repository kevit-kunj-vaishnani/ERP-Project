/* eslint-disable prettier/prettier */
import {
  findAttendanceById,
  findAttendanceByIdAndDelete,
  findAttendances,
  findAttendanceByIdAndUpdate,
  addAttendance
} from './attendance.services';
import {logger} from '../../utils/logger';
import {Request, Response, NextFunction} from 'express';

/**
 * get attendance (  Staff , Admin can do it.)
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getAttendance = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const attendance = await findAttendances();
    return res.status(200).send({success: true, data: attendance});
  } catch (error) {
    next(error);
  }
};

/**
 * add attendance (  Staff , Admin can do it.)
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const createAttendance = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
  try {
    const attendance = await addAttendance(req.body);
    return res.status(200).send({success: true, data: attendance});
  } catch (error) {
    next(error);
  }
};

/**
 * by id attendance (  Staff , Admin can do it.)
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getAttendanceById = async (req: Request, res: Response, next: NextFunction): Promise<object> => {
  try {
    const attendance = await findAttendanceById(req.params.id);
    return res.status(200).send({success: true, data: attendance});
  } catch (error) {
    next(error);
  }
};

/**
 * find attendance by id & update by (Admin can do it.)
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getAttendanceByIDAndUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const attendance = await findAttendanceByIdAndUpdate(req.params.id);

    for (const fieldName in req.body) {
      attendance[fieldName] = req.body[fieldName];
    }

    logger.info(`updated attendance : student id = ${attendance.studentId}`);

    await attendance.save();
    return res.status(200).send({success: true, data: attendance || 'no attendance available'});
  } catch (error) {
    next(error);
  }
};

/**
 * get attendance (  Staff , Admin can do it.)
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getAttendanceByIdAndDelete = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  try {
    const attendance = await findAttendanceByIdAndDelete(req.params.id);
    return res.status(200).send({success: true, data: attendance});
  } catch (error) {
    next(error);
  }
};
