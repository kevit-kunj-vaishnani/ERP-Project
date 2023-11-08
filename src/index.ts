import {App} from './app';
import {router as pingRouter} from './ping';
import {router as userRouter} from './modules/User/user.routes';
import {router as studentRouter} from './modules/Student/student.routes';
import {router as deptRouter} from './modules/Department/department.routes';
import {router as attendanceRouter} from './modules/Attendance/attendance.routes';

const app = new App([pingRouter, userRouter, studentRouter, deptRouter, attendanceRouter]); // for running project use this
// const app = new App([pingRouter, userRouter, studentRouter, deptRouter, attendanceRouter]).app;      // for testing use this

app.listen();

export {app};
