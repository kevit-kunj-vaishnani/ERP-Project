import {Attendance} from './attendance.model';
import {IAttendance} from '../../interfaces';
import {customError} from '../../utils/error';
// import {logger} from '../../utils/logger';

// find all attendance =
export const findAttendances = async (): Promise<IAttendance[]> => {
  try {
    return await Attendance.find();
  } catch (error) {
    throw customError(500, error);
  }
};

// find 1 attendance by id =
export const findAttendanceById = async (_id): Promise<IAttendance> => {
  try {
    return await Attendance.findById(_id);
  } catch (error) {
    throw customError(500, error);
  }
};

// add attendance
export const addAttendance = async (data): Promise<object> => {
  try {
    return await Attendance.create(data);
  } catch (error) {
    throw customError(500, error);
  }
};

// delete attendance
export const findAttendanceByIdAndDelete = async (_id): Promise<IAttendance> => {
  try {
    return await Attendance.findByIdAndDelete(_id);
  } catch (error) {
    throw customError(500, error);
  }
};

// update attendance
export const findAttendanceByIdAndUpdate = async (_id): Promise<IAttendance> => {
  try {
    return await Attendance.findById(_id);
  } catch (error) {
    throw customError(500, error);
  }
};
