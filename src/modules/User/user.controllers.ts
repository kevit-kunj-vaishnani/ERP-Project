import {Request, Response} from 'express';
import {findUsers} from './user.services';

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await findUsers();
  console.log(users);
  return res.status(200).send(users);
};
