/* eslint-disable prettier/prettier */
import {User} from './user.model';
import {IUser} from '../../interfaces';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';

// get all users =
export const findUsers = async (): Promise<IUser[]> => {
  try {
    return await User.find();
  } catch (err) {
    logger.error(`Error while finding user`);
    throw customError(500, err);
  }
};

// create user =
export const addUser = async (user: IUser): Promise<object> => {
  try {
    return await User.create(user);
  } catch (err) {
    logger.error(`Error in add user`);
    throw customError(500, err);
  }
};

// find 1 user by id =
export const findUserById = async (_id): Promise<IUser> => {
  try {
    return await User.findById(_id);
  } catch (err) {
    logger.error(`Error in find user by ID`);
    throw customError(500, err);
  }
};

// find 1 USER by id and update =
export const findUserByIdAndUpdate = async (_id): Promise<IUser> => {
  try {
    return await User.findByIdAndUpdate(_id);
  } catch (err) {
    logger.error(`Error while update user`);
    throw customError(500, err);
  }
};

// find 1 USER by id and delete =
export const findUserByIdAndDelete = async (_id): Promise<IUser> => {
  try {
    return await User.findByIdAndDelete(_id);
  } catch (err) {
    logger.error(`Error in delete user`);
    throw customError(500, err);
  }
};

// find user by email =
// (for login)
export const findUserByEmail = async (email): Promise<IUser> => {
  try {
    return await User.findOne({email: email});
  } catch (err) {
    logger.error(`Error while finding user by Email`);
    throw customError(500, err);
  }
};
