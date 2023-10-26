import {NextFunction, Request, Response} from 'express';
import {logger} from '../utils/logger';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  const {code, error} = JSON.parse(err.message);

  if (error?.name === 'ValidationError') {
    return res.status(code).json({success: 'error', error});
  }
  return res.status(code).json({success: 'error', error: error.message});
};
