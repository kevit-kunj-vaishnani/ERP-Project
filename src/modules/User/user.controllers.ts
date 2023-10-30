import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken'; // it is used to sign a JSON Web Token (JWT) using the RSA256 algorithm
import {join} from 'path';
import {
  findUsers,
  addUser,
  findUserById,
  findUserByIdAndUpdate,
  findUserByIdAndDelete,
  findUserByEmail
} from './user.services';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';
import {error} from 'winston';

/**
 * get all users ( staff , admin can do )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await findUsers();

    // if (users.length === 0) {
    //   throw customError(404, 'no user available');
    // }

    return res.status(200).send({success: true, data: users || 'no user available'});
  } catch (err) {
    next(err);
    //error comes from services to controller and from controller it goes to error-handler
  }
};

/**
 * create new user ( only admin can do )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // this function will check whether user already exists or not
    // if (findUserByEmail(req.body.email)){
    //   throw customError(500, 'User already exits');
    // }

    const user = await addUser(req.body);
    logger.info(user);

    return res.status(200).send({success: true, data: user});
  } catch (err) {
    logger.error(`Error in adding User = ${err}`);
    next(err);
  }
};

/**
 * get 1 user by id ( staff , admin can do )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserById(req.params.id);

    // if (!user) {
    //   throw customError(404, 'no user available');
    // }
    logger.info({user});

    return res.status(200).send({success: true, data: user || 'no user available'});
  } catch (error) {
    logger.error(`Error in fetching user ${error}`);
    next(error);
  }
};

/**
 * find user by id & update only password field ( staff , admin can do )
 * @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getUserByIdAndUpdate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data']; // console.log(req['data']); { _id: '653bb0216c68fc31a1b2138a', role: 'STAFF'}
    const user = await findUserByIdAndUpdate(_id);

    // if (!user) {
    //   throw customError(404, 'user not found');
    // }

    logger.info(`old user = ${user}`);

    // // if role = staff then only password she can update
    // if (user.role === 'STAFF') {
    //   user.password = req.body.password;
    // } else if (user.role === 'ADMIN') {
    //   // if role = admin then everything she can update
    //   // i = property 1,2,3,..
    //   for (const i in req.body) {
    //     user[i] = req.body[i];
    //   }
    // }

    if (!req.body.password) {
      logger.error(`you can update only password field.`);
      throw customError(400, 'you can update only password field. ');
    }

    user.password = req.body.password;

    logger.info(`updated user = ${user}`);

    await user.save();

    return res.status(200).send({success: true, data: user || 'no user available'});
  } catch (error) {
    logger.error(`Error in updating Password ${error}`);
    next(error);
  }
};

/**
 * find user by id & update any field ( admin only can do )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getUserByIdAndUpdateAll = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    // const {_id} = req['data'];
    const user = await findUserByIdAndUpdate(req.params.id);

    // if (!user) {
    //   throw customError(204, 'user not found');
    // }

    logger.info(`old user = ${user}`);

    for (const i in req.body) {
      user[i] = req.body[i];
    }

    logger.info(`updated user = ${user}`);

    await user.save();

    return res.status(200).send({success: true, data: user || 'no user available'});
  } catch (error) {
    logger.error(`Error in update ${error}`);
    next(error);
  }
};

/**
 * find user by id & delete ( admin can do )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const getUserByIdAndDelete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserByIdAndDelete(req.params.id);

    // if (!user) {
    //   throw customError(204, 'user not found');
    // }

    logger.info(`${user.name} is now deleted from database`);

    return res.status(200).send({success: true, data: user || 'no user available'});
  } catch (error) {
    logger.error(`Error in deleting user ${error}`);
    next(error);
  }
};

/**
 * user login ( any one can do )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */

// findByCredentials is function we have made so we have to write static
export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserByEmail(req.body.email);
    // if (!user) {
    //   throw customError(204, 'user not found');
    // }

    const did_Password_Match = await bcrypt.compare(req.body.password, user.password);

    if (!did_Password_Match) {
      throw customError(401, 'Please enter valid authentication credentials');
    }

    // __dirname = Desktop/ERP/ERP-Project/src  ( current directory )
    const privateKey = fs.readFileSync(join(__dirname, '../../../keys/private.key')); // joining path of current drectory to private.keys
    const token = jwt.sign({_id: user._id.toString(), role: user.role}, privateKey, {algorithm: 'RS256'}); // jwt.sign( payload(object) , private key , options(which algorithm we are using in object))
    // When above code is executed, it generates a JWT with the provided payload and signs it using the secret key.

    user.authToken = token;
    await user.save();
    return res.status(200).send({success: true, data: user || 'no user available'});
  } catch (error) {
    logger.error(`Error in Login ${error}`);
    next(error);
  }
};

/**
 * user logout ( who is login )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];

    const user = await findUserById(_id);
    if (!user) {
      throw customError(204, 'User not found');
    }

    user.authToken = undefined;
    user.save();
    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.error(`Error while logout a user: ${error}`);
    next(error);
  }
};

/**
 * myself ( who is login )
 *  @param {Request} req => Express Request
 * @param {Response} res => Express Response
 * @param {NextFunction} next => Express NextFunction
 * @returns {Promise<Response>} => promise with response
 */
export const myself = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];

    const user = await findUserById(_id);

    // if (!user) {
    //   logger.info('User not found');
    //   throw customError(204, 'User not found');
    // }

    return res.status(200).send({success: true, data: user || 'User not found'});
  } catch (error) {
    logger.error(`Error in getting myself: ${error}`);
    next(error);
  }
};
