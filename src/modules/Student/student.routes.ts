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

export const router = Router();

const route = 'students';

// get all students
router.get(`/${route}`, auth, authorization(['ADMIN', 'STAFF']), getStudents);

// get me
router.get(`/${route}/me`, auth, myself);

// create student
router.post(`/${route}/add`, auth, authorization(['ADMIN', 'STAFF']), createStudent);

// update student
router.patch(`/${route}/update/myself`, auth, authorization(['STUDENT']), getStudentAndUpdate, [
  check('password')
    .exists()
    .withMessage('password is required')
    .isString()
    .withMessage('please give only password')
    .custom((value, {req}) => {
      // value is updated password value
      const givenKey = Object.keys(req.body);
      const isOnlyPassword = givenKey.length === 1;

      if (!isOnlyPassword) {
        throw customError(400, 'Only the password field is allowed');
      }

      return true;
    })
]);

// update everything of student
router.patch(
  `/${route}/update/:id`,
  auth,
  authorization(['ADMIN', 'STAFF']),
  [check('password').not().exists().withMessage('you cannot update password')], // array of validation to check whether password field is there or not. if it is there then throw error as staff, admin cannot update student password
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
