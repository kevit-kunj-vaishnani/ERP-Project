import {Router} from 'express';
import {auth} from '../../middleware/auth';
import {
  getUsers,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndDelete,
  userLogin,
  logoutUser
} from './user.controllers';

const router = Router();

const route = 'users';

// get all users
router.get(`/${route}`, auth, getUsers);

// get 1 user by id
router.get(`/${route}/:id`, auth, getUserById);

// create user
router.post(`/${route}/add`, auth, createUser);

// update user
router.patch(`/${route}/update/:id`, auth, getUserByIdAndUpdate);

// delete user
router.delete(`/${route}/delete/:id`, auth, getUserByIdAndDelete);

//login user
router.post(`/${route}/login`, userLogin);

//logout user
router.post(`/${route}/logout`, auth, logoutUser);

export {router};
