import {Request, Response, NextFunction} from 'express';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken';
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

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await findUsers();

    if (users.length === 0) {
      throw customError(404, 'no user available');
    }

    return res.status(200).send({users});
  } catch (err) {
    next(err);
    //error comes from services to controller and from controller it goes to error-handler
  }
};

export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await addUser(req.body);
    logger.info(user);

    return res.status(200).send({data: user});
  } catch (err) {
    console.log(err);
    next(err);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserById(req.params.id);
    logger.info({user});

    return res.status(200).send({data: user});
  } catch (err) {
    console.log(`errror:${err}`);
    next(err);
  }
};

export const getUserByIdAndUpdate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserByIdAndUpdate(req.params.id);
    logger.info(`old user = ${user}`);

    if (!user) {
      throw customError(404, 'user not found');
    }

    // i = property 1,2,3,..
    for (const i in req.body) {
      user[i] = req.body[i];
    }

    logger.info(`updated user = ${user}`);

    await user.save();

    return res.status(200).send({data: user});
  } catch (err) {
    next(err);
  }
};

export const getUserByIdAndDelete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const user = await findUserByIdAndDelete(req.params.id);

    logger.info(`${user.name} is now deleted from database`);

    return res.status(200).send({data: user});
  } catch (err) {
    next(err);
  }
};

// for login through email and password

// findByCredentials is function we have made so we have to write static
export const userLogin = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    if (req.params.email === null || req.params.password === null) {
      console.log('email or password missing');
      throw customError(400, 'email or password missing');
    }
    const user = await findUserByEmail(req.params.email);
    const did_Password_Match = await bcrypt.compare(req.params.password, user.password);

    if (!did_Password_Match) {
      throw customError(401, 'Please enter valid authentication credentials');
    }

    const privateKey = fs.readFileSync(join(__dirname, '../../keys/private.key'));
    const token = jwt.sign({id: user._id, email: user.email}, privateKey, {algorithm: 'RS256'});

    user.authToken = token;
    await user.save();
    return res.status(200).send({authToken: token});
  } catch (error) {
    next(error);
  }
};
