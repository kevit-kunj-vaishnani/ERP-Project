import express from 'express';

const router = express.Router();

router.get('/ping', (req, res) => {
  res.send({ping: 'ping'});
});

export {router};
