/* eslint-disable prettier/prettier */
import {Student} from './student.model';
import {IStudent} from '../../interfaces';
import {customError} from '../../utils/error';
import {logger} from '../../utils/logger';
import {Department} from '../Department/department.model';
import {findDepartmentById} from '../Department/department.services';
import {Attendance} from '../Attendance/attendance.model';

// when student gets deleted his attendance should get deleted
export const deleteAttendance = async (student_id): Promise<void> => {
  try {
    await Attendance.deleteMany({studentId: student_id});
  } catch (error) {
    throw customError(500, error);
  }
};

// check whethere updated department has vacancy in occupied seats. (for admin when he update student branch in getStudentByIdAndUpdateAll )
export const checkNewDepartment = async (newDepartmentId): Promise<void> => {
  try {
    const newDepartment = await Department.findOne({_id: newDepartmentId});

    if (newDepartment.occupiedSeats >= newDepartment.availableSeats) {
      throw 'seats not available';
    }
  } catch (error) {
    throw customError(500, error);
  }
};

// function to check is occupied seats are available (for admin when he add student )
export const checkSeatCount = async (departmentId): Promise<void> => {
  try {
    const department = await findDepartmentById(departmentId);

    if (department.occupiedSeats >= department.availableSeats) {
      throw 'seats not available';
    }
  } catch (error) {
    throw customError(500, error);
  }
};

// function to increase occupied seats ( for admin when he add student )
export const increaseSeatCount = async (departmentId): Promise<void> => {
  try {
    const department = await findDepartmentById(departmentId);
    department.occupiedSeats++;

    await department.save();
  } catch (error) {
    throw customError(500, 'Error in increasing count');
  }
};

// function to decrease occupied seats ( for admin when he add student )
export const decrease_seatOccupied = async (departmentId): Promise<void> => {
  try {
    const department = await findDepartmentById(departmentId);

    if (department.occupiedSeats <= 0) {
      throw 'seats already 0';
    }

    department.occupiedSeats = department.occupiedSeats - 1;
    logger.info(department.occupiedSeats);

    await department.save();
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
