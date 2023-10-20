import {User} from './user.model';
import {IUser} from '../../interfaces';

export const findUsers = async (): Promise<IUser[]> => {
  try {
    return await User.findById('123');
  } catch (err) {
    throw err;
  }
};
