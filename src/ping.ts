import {Router} from 'express';

const router = Router();

router.get('/ping', (req, res) => {
  console.log('ping');
  res.send('Pong');
});

export {router};
