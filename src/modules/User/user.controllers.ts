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

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await findUsers();

    if (users.length === 0) {
      throw customError(404, 'no user available');
    }

    return res.status(200).send({success: true, data: users});
  } catch (err) {
    next(err);
    //error comes from services to controller and from controller it goes to error-handler
  }
};

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
    logger.info(`Error in add ${err}`);
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserById(req.params.id);

    if (!user) {
      throw customError(404, 'no user available');
    }
    logger.info({user});

    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.info(`Error in fetching user ${error}`);
    next(error);
  }
};

export const getUserByIdAndUpdate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserByIdAndUpdate(req.params.id);

    if (!user) {
      throw customError(404, 'user not found');
    }

    logger.info(`old user = ${user}`);

    // i = property 1,2,3,..
    for (const i in req.body) {
      user[i] = req.body[i];
    }

    logger.info(`updated user = ${user}`);

    await user.save();

    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.info(`Error in update ${error}`);
    next(error);
  }
};

export const getUserByIdAndDelete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserByIdAndDelete(req.params.id);

    if (!user) {
      throw customError(404, 'user not found');
    }

    logger.info(`${user.name} is now deleted from database`);

    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.info(`Error in deleting user ${error}`);
    next(error);
  }
};

// for login through email and password
// findByCredentials is function we have made so we have to write static
export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    if (!req.body.email || !req.body.password) {
      logger.error('email or password missing');
      throw customError(400, 'email or password missing');
    }
    const user = await findUserByEmail(req.body.email);
    if (!user) {
      throw customError(404, 'user not found');
    }
    logger.info(user);
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
    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.info(`Error in Login ${error}`);
    next(error);
  }
};

// logout user from 1 device
export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const {_id} = req['data'];

    const user = await findUserById(_id);
    if (!user) {
      logger.info('hi');
      throw customError(404, 'User not found');
    }
    logger.info('hi3');

    user.authToken = undefined;
    user.save();
    return res.status(200).send({success: true, data: user});
  } catch (error) {
    logger.error(`Error while logout a user: ${error}`);
    next(error);
  }
};
