import {Router} from 'express';
import {
  getUsers,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndDelete,
  userLogin
} from './user.controllers';

const router = Router();

const route = 'users';

// get all users
router.get(`/${route}`, getUsers);

// get 1 user by id
router.get(`/${route}/:id`, getUserById);

// create user
router.post(`/${route}/add`, createUser);

// update user
router.patch(`/${route}/update/:id`, getUserByIdAndUpdate);

// delete user
router.delete(`/${route}/delete/:id`, getUserByIdAndDelete);

//login user
router.post(`/${route}/login`, userLogin);

export {router};
