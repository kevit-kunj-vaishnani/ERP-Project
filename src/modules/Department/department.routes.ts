import {Router} from 'express';
import {authorization} from '../../middleware/authorization';
import {
  getDepartments,
  createDepartment,
  getDepartmentByIdAndUpdate,
  getDepartmentByIDAndDelete,
  getDepartmentByID,
  q1,
  q2,
  q3,
  q4
} from './department.controller';
import {auth} from '../../middleware/auth';

const route = 'department';
export const router = Router();

// department statistics
router.get(`/data`, auth, authorization(['ADMIN']), q1);

// absent on specific date
router.post(`/absent`, auth, authorization(['ADMIN']), q2);

// present lt 75% on specific date
router.post(`/absent75`, auth, authorization(['ADMIN']), q3);

// dept data
router.post(`/dep/data`, auth, authorization(['ADMIN']), q4);

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

router.put(``);
