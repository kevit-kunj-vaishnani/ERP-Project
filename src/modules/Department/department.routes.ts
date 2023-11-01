import {Router} from 'express';
import {authorization} from '../../middleware/authorization';
import {
  getDepartments,
  createDepartment,
  getDepartmentByIdAndUpdate,
  getDepartmentByIDAndDelete,
  getDepartmentByID
} from './department.controller';
import {auth} from '../../middleware/auth';

const route = 'department';
export const router = Router();

// get all department =
router.get(`/${route}`, auth, authorization(['ADMIN']), getDepartments);

// create department
router.post(`/${route}/add`, auth, authorization(['ADMIN']), createDepartment);

// update department
router.patch(`/${route}/update/:id`, auth, authorization(['ADMIN']), getDepartmentByIdAndUpdate);

// delete department
router.delete(`/${route}/delete/:id`, auth, authorization(['ADMIN']), getDepartmentByIDAndDelete);

// get all department =
router.get(`/${route}/:id`, auth, authorization(['ADMIN']), getDepartmentByID);
