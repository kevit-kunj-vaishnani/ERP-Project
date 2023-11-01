/* eslint-disable prettier/prettier */
import {Student} from './student.model';
import {IStudent} from '../../interfaces';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';
import {Department} from '../Department/department.model';
import {findDepartmentById} from '../Department/department.services';

// operation for increase occupied seat count function
export const increase_occupiedSeats = async (departmentId): Promise<void> => {
  try {
    const temporary = await findDepartmentById(departmentId);

    if (temporary.occupiedSeats >= temporary.availableSeats) {
      throw 'seats not available';
    }

    temporary.occupiedSeats = temporary.occupiedSeats + 1;

    await temporary.save();
    logger.info(temporary);
  } catch (error) {
    throw customError(500, error);
  }
};

// decrease seats occupied seat count function
export const decrease_occupiedSeats = async (departmentId): Promise<void> => {
  try {
    const temporary = await findDepartmentById(departmentId);

    if (temporary.occupiedSeats <= 0) {
      throw 'seats already 0';
    }

    temporary.occupiedSeats = temporary.occupiedSeats - 1;

    await temporary.save();
    logger.info(temporary);
  } catch (error) {
    throw customError(500, error);
  }
};

// get all Students =
export const findStudents = async (): Promise<IStudent[]> => {
  try {
    return await Student.find();
  } catch (error) {
    logger.error('student not available');
    throw customError(500, error);
  }
};

// create student =
export const addStudent = async (student): Promise<object> => {
  try {
    return await Student.create(student);
  } catch (error) {
    logger.error('student create error');
    throw customError(500, error);
  }
};

// find 1 Student by id =
export const findStudentById = async (_id): Promise<IStudent> => {
  try {
    return await Student.findById(_id);
  } catch (error) {
    logger.error(`error occur in student service findById`);
    throw customError(500, error);
  }
};

// find 1 student by id and update =
export const findStudentByIdAndUpdate = async (_id): Promise<IStudent> => {
  try {
    return await Student.findByIdAndUpdate(_id);
  } catch (error) {
    logger.error(`error occur in student service findStudentByIdAndUpdate`);
    throw customError(500, error);
  }
};

// delete student =
export const findStudentByIdAndDelete = async (_id): Promise<IStudent> => {
  try {
    return await Student.findByIdAndDelete(_id);
  } catch (error) {
    logger.error(`error occur in student service findStudentAndDelete`);
    throw customError(500, error);
  }
};

// find student by email =
// (for login) =
export const findStudentByEmail = async (email): Promise<IStudent> => {
  try {
    return await Student.findOne({email: email});
  } catch (error) {
    logger.error(`error occur in student service findStudentByEmail`);
    throw customError(500, error);
  }
};
