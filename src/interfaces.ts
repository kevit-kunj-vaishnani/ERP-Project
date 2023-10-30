import {Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: Roles;
  designation: string;
  email: string;
  phone: number;
  password: string;
  department: string;
  authToken: string;
}

export interface IStudent extends Document {
  name: string;
  role: Roles;
  email: string;
  phone: number;
  password: string;
  department: string;
  authToken: string;
  sem: number;
  batch: number;
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
