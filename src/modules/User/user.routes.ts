import {Router} from 'express';
import {getUsers} from './user.controllers';

const router = Router();

const route = 'users';
router.get(`/${route}`, getUsers);

export {router};
