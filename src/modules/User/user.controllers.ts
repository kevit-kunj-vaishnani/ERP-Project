import {Request, Response, NextFunction} from 'express';
import {findUsers} from './user.services';

export const getUsers = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  try {
    const users = await findUsers();
    console.log(users);
    return res.status(200).send(users);
  } catch (err) {
    next(err);
    // next(new Error(err));
  }
};
