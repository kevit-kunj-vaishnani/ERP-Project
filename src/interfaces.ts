import {Document} from 'mongoose';

export interface IUser extends Document {
  name: string;
  role: string;
  designation: string;
  email: string;
  phone: number;
  password: string;
  department: string;
  authToken: string;
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
