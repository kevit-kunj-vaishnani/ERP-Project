import {Router} from 'express';
import {auth} from '../../middleware/auth';
import {
  getUsers,
  createUser,
  getUserById,
  getUserByIdAndUpdate,
  getUserByIdAndDelete,
  userLogin,
  logoutUser,
  myself,
  getUserByIdAndUpdateAll
} from './user.controllers';
import {authorization} from '../../middleware/authorization';

const router = Router();

const route = 'users';

// get all users
router.get(`/${route}`, auth, authorization(['ADMIN', 'STAFF']), getUsers);

// get me
router.get(`/${route}/me`, auth, myself);

// create user
router.post(`/${route}/add`, auth, authorization(['ADMIN']), createUser);

// update user
router.patch(`/${route}/update/myself`, auth, authorization(['ADMIN', 'STAFF']), getUserByIdAndUpdate);

// update everything of user
router.patch(`/${route}/update/all`, auth, authorization(['ADMIN']), getUserByIdAndUpdateAll);

// delete user
router.delete(`/${route}/delete/:id`, auth, authorization(['ADMIN']), getUserByIdAndDelete);

//login user
router.post(`/${route}/login`, userLogin);

//logout user
router.post(`/${route}/logout`, auth, logoutUser);

router.get(`/${route}/:id`, auth, authorization(['ADMIN', 'STAFF']), getUserById);
export {router};
