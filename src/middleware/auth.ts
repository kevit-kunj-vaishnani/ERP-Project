// import jwt from 'jsonwebtoken';
import {join} from 'path';
import fs from 'fs';
import {findUserById} from '../modules/User/user.services';
import {Request, Response, NextFunction, json} from 'express';
import {customError} from '../utils/error';
import {logger} from '../utils/logger';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    throw customError(401, 'unauth');
  }
  try {
    const privateKey = fs.readFileSync(join(__dirname, '../../keys/private.key'));
    const obj = jwt.verify(token, privateKey);
    // console.log(typeof obj);

    // const {_id, role} = obj;
    const _id = obj['_id'];
    const role = obj['role'];

    const user = await findUserById(_id);
    if (token !== user.authToken) {
      throw customError(401, 'Unauthenticated');
    }
    req['data'] = {_id, role};
    next();
  } catch (error) {
    logger.error(`Error occurred while authentication - ${error}`);
    next(error);
  }
};
