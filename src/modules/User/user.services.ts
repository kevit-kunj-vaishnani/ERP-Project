import {User} from './user.model';
import {IUser} from '../../interfaces';
import {customError} from '../../utils/error';

export const findUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (err) {
    throw customError(500, err);
  }
};
