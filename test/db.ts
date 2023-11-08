import request from 'supertest';
import {app} from '../src/index';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import fs from 'fs';
import {join} from 'path'
import bcrypt from 'bcryptjs';
import { User } from '../src/modules/User/user.model';

const privateKey = fs.readFileSync(join(__dirname, '../keys/private.key'));

const adminId = new mongoose.Types.ObjectId()
const staffId = new mongoose.Types.ObjectId()
const departmentId = new mongoose.Types.ObjectId()
const studentId = new mongoose.Types.ObjectId()

// admin create
export const admin = {
    _id: adminId,
    name : 'neel',
    email : 'neel@gmail.com',
    password : "neel",
    phone: 379224,
    designation: 'teacher',
    authToken : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRiNTFjYmViYzVjYjlmZDA0OGI1ZDkiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE2OTk0MzQ5NTV9.P_oikDzcMo939tP4MUPCqFJw67ZbYwGyB5q81wWe6OokGMxlKVC6ABw5lM82hVI50SEzpgubvH1-SmaXmCKrbQ7X-mGe5vGrsCL6_dTS_9EPxO5SmPiQXT5SbhfedPa2Z6WSmz8JleR8prQHa6ZGnDUfCDX3j1dbymoE-ozrZwjYbomyxN4FtDyJ-TENpdtoPkdHoFqnvES09zNsUUPNVctJWqPhnnxG6RiJci6CYWcd0twJcKi1s8T6cnY-1FQlm_DTQCKoFCUGkvWq8nDLJlZf6V06ErrZQJELleYc9pfGvo8Yp6KdSH_SWSOLXtmj8AOzwt6GiobuJFWXKpA7JQ',
    role:"ADMIN",
    departmentId: departmentId
}

// staff create
export const staff = {
    _id: staffId,
    name : 'kuna',
    email : 'kuna@gmail.com',
    password : "123",
    phone: 379224,
    designation: 'teacher',
    authToken : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTRiNDlmNmRmOGUzZTNmYTI4OTAwNTQiLCJyb2xlIjoiU1RBRkYiLCJpYXQiOjE2OTk0MzI5NTB9.EwM1W207CjRhNbRzNjbhc3iWgak1h4kUs3f-zTHBOf4TyhgRy82YVmsyrLQIRo5IEIRCB0j1Y2K9-F31xavDU1RExHSgkTWVzq_LcFbt_DD8V--JsUGen4cLrHLnYRfVOMQLRhGv5oglOkZHgN4gVP95Zr_3g3dphdU-wveG2cY5NTKp70bhtx2K523ARyU5iE1h-YkPXdIjsH_xVi4iqjZi6uyGb-5cZVCFNKyQsuEXDvVkus0PnPIwWJPGguaWS8GNt17Aw6CQ4OeTHQwh4pYfCvgP2NrTmNB8XxGOkOb5SULLJh854BwK7nilwjX3C1Gar2J8LbUUvwe7E-kugw',
    role:"STAFF",
    departmentId: departmentId
}

// department
export const department = {
    _id: departmentId,
    name: "IT",
    initials: "IT",
    availableSeats: 8,
    batch: 2025,
    occupiedSeats: 7
}

// student 
export const student = {
    _id: studentId,
    name : 'amay',
    email : 'amay@gmail.com',
    password : "amay",
    phone: 3453434,
    authToken : jwt.sign({_id: studentId, role: "STUDENT"}, privateKey , {algorithm: 'RS256'}),
    role:"STUDENT",
    departmentId: "654b0c45dd4c99493d7fa5b7",
    sem: 7
}

