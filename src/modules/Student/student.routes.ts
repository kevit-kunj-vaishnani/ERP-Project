import {Router} from 'express';
import {auth} from '../../middleware/auth';
import {
  getStudents,
  createStudent,
  getStudentById,
  getStudentAndUpdate,
  getStudentByIdAndDelete,
  studentLogin,
  studentLogout,
  myself,
  getStudentByIdAndUpdateAll
} from './student.controller';
import {authorization} from '../../middleware/authorization';
import {check} from 'express-validator';
import {logger} from '../../utils/logger';
import {customError} from '../../utils/error';
import {updateOnlyPasswordField, updateExceptPassword} from './student.helper';

export const router = Router();

const route = 'students';

// get all students
router.get(`/${route}`, auth, authorization(['ADMIN', 'STAFF']), getStudents);

// get me
router.get(`/${route}/me`, auth, myself);

// create student
router.post(`/${route}/add`, auth, authorization(['ADMIN', 'STAFF']), createStudent);

// update student
router.patch(
  `/${route}/update/myself`,
  auth,
  authorization(['STUDENT']),
  updateOnlyPasswordField(),
  getStudentAndUpdate
);

// update everything of student
router.patch(
  `/${route}/update/:id`,
  auth,
  authorization(['ADMIN', 'STAFF']),
  updateExceptPassword(),
  getStudentByIdAndUpdateAll
);

// delete student
router.delete(`/${route}/delete/:id`, auth, authorization(['ADMIN', 'STAFF']), getStudentByIdAndDelete);

//login student
router.post(`/${route}/login`, studentLogin);

//logout student
router.post(`/${route}/logout`, auth, studentLogout);

// get 1 student by id
router.get(`/${route}/:id`, auth, authorization(['ADMIN', 'STAFF']), getStudentById);

// module.exports = router;
