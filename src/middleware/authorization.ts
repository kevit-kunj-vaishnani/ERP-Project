import {logger} from '../utils/logger';
import {customError} from '../utils/error';

export const authorization = (roles: string[]) => {
  return (req, res, next) => {
    const {role} = req['data']; //here we are fetching role field from req['data'] object
    // const {id} = req['data'];
    // logger.warn(id);

    if (!roles.includes(role)) {
      logger.error('user does not have right');
      throw customError(403, 'user does not have right');
    }

    next();
  };
};
