import {Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: Roles;
  designation: string;
  email: string;
  phone: number;
  password: string;
  departmentId: string;
  authToken: string;
}

export interface IStudent extends Document {
  name: string;
  role: Roles;
  email: string;
  phone: number;
  password: string;
  departmentId: string;
  authToken: string;
  sem: number;
  batch: number;
}

export interface IDepartment extends Document {
  name: string;
  initials: string;
  availableSeats: number;
  occupiedSeats: number;
  batch: number;
}

export interface IAttendance extends Document {
  studentId: string;
  date: Date;
  isPresent: boolean;
}

export interface IError {
  success: string;
  error: Error;
}

export enum Roles {
  ADMIN = 'ADMIN',
  STUDENT = 'STUDENT',
  STAFF = 'STAFF'
}
