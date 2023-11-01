import {App} from './app';
import {router as pingRouter} from './ping';
import {router as userRouter} from './modules/User/user.routes';
import {router as studentRouter} from './modules/Student/student.routes';
import {router as deptRouter} from './modules/Department/department.routes';

const app = new App([pingRouter, userRouter, studentRouter, deptRouter]);

app.listen();
