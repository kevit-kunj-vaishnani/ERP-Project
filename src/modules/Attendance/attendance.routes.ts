/* eslint-disable prettier/prettier */
import {Router} from 'express';
import {
  getAttendanceByIDAndUpdate,
  getAttendance,
  getAttendanceById,
  getAttendanceByIdAndDelete,
  createAttendance
} from './attendance.controller';
import {auth} from '../../middleware/auth';
import {authorization} from '../../middleware/authorization';

const routes = 'attendance';

export const router = Router();

// get all Att endance =
router.get(`/${routes}`, auth, authorization(['ADMIN', 'STAFF']), getAttendance);

// create Attendance =
router.post(`/${routes}/add`, auth, authorization(['ADMIN', 'STAFF']), createAttendance);

// get 1 Attendance by Id =
router.get(`/${routes}/:id`, auth, authorization(['ADMIN', 'STAFF']), getAttendanceById);

// update attendance =
router.patch(`/${routes}/update/:id`, auth, authorization(['ADMIN', 'STAFF']), getAttendanceByIDAndUpdate);

// delete attendance =
router.delete(`/${routes}/delete/:id`, auth, authorization(['ADMIN', 'STAFF']), getAttendanceByIdAndDelete);
