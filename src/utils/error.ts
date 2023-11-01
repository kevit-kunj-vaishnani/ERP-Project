import {ValidationError} from 'express-validator';

export const customError = (code: number, error: Error | string | ValidationError[]): Error => {
  return new Error(JSON.stringify({code, error}));
};
