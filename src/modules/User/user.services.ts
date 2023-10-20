import {User} from './user.model';
import {IUser} from '../../interfaces';

export const findUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (err) {
    throw err;
  }
};
