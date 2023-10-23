import {Request, Response, NextFunction} from 'express';
import {findUsers} from './user.services';
import {customError} from '../../utils/error';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await findUsers();

    if (users.length === 0) {
      throw customError(404, 'no user available');
    } else {
      return res.status(200).send(users);
    }
  } catch (err) {
    next(err);
  }
};
