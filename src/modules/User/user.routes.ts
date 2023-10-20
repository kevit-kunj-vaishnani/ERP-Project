import {Router} from 'express';
import {getUsers} from './user.controllers';

const router = Router();

router.get('/users', getUsers);

export {router};
