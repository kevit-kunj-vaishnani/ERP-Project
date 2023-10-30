import {logger} from '../utils/logger';
import {customError} from '../utils/error';

export const authorization = (roles: string[]) => {
  return (req, res, next) => {
    const {role} = req['data'];
    // logger.warn(roles);
    if (!roles.includes(role)) {
      logger.error('user does not have right');
      throw customError(403, 'user does not have right');
    }

    next();
  };
};
