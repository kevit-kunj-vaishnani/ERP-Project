import {Department} from './department.model';
import {IDepartment} from '../../interfaces';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';
import {Student} from '../Student/student.model';

export const findDepartments = async (): Promise<IDepartment[]> => {
  try {
    return await Department.find();
  } catch (error) {
    throw customError(500, error);
  }
};

export const deleteAllStudent = async (id): Promise<void> => {
  try {
    const student = await Student.deleteMany({departmentId: id});
  } catch (error) {
    throw customError(500, error);
  }
};

export const findDepartmentById = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findById({_id: _id});
  } catch (error) {
    throw customError(500, error);
  }
};

export const addDepartment = async (department): Promise<object> => {
  try {
    return await Department.create(department);
  } catch (error) {
    throw customError(500, error);
  }
};

export const findDepartmentByIdAndDelete = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findByIdAndDelete(_id);
  } catch (error) {
    throw customError(500, error);
  }
};

export const findDepartmentByIdAndUpdate = async (_id): Promise<IDepartment> => {
  try {
    return await Department.findByIdAndUpdate(_id);
  } catch (error) {
    throw customError(500, error);
  }
};
