import {Department} from './department.model';
import {IDepartment} from '../../interfaces';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';
import {Student} from '../Student/student.model';
import {Attendance} from '..//Attendance/attendance.model';

// find all department
export const findDepartments = async (): Promise<IDepartment[]> => {
  try {
    return await Department.find();
  } catch (error) {
    throw customError(500, error);
  }
};

// find 1 department by id
export const findDepartmentById = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findById({_id: _id});
  } catch (error) {
    throw customError(500, error);
  }
};

// add department
export const addDepartment = async (department): Promise<object> => {
  try {
    return await Department.create(department);
  } catch (error) {
    throw customError(500, error);
  }
};

// delete department
export const findDepartmentByIdAndDelete = async (_id): Promise<IDepartment> => {
  try {
    const department = await Department.findById(_id);
    const student = await Student.find({departmentId: department._id});
    const allStudentsIds = student.map((i) => {
      return i._id;
    });

    await Department.findByIdAndDelete(_id);
    await Student.deleteMany({departmentId: _id});
    await Attendance.deleteMany({studentId: {$in: allStudentsIds}});

    return department;
  } catch (error) {
    throw customError(500, error);
  }
};

// update department
export const findDepartmentByIdAndUpdate = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findByIdAndUpdate(_id);
  } catch (error) {
    throw customError(500, error);
  }
};
// file over
