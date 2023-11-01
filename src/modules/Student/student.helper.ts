import {body} from 'express-validator';
import {customError} from '../../utils/error';

export const updateOnlyPasswordField = () => {
  return [
    body('password')
      .exists()
      .withMessage('password is required')
      .isString()
      .withMessage('please give only password')
      .custom((value, {req}) => {
        // value is updated password value
        const givenKey = Object.keys(req.body);
        const isOnlyPassword = givenKey.length === 1;

        if (!isOnlyPassword) {
          throw customError(400, 'Only the password field is allowed');
        }

        return true;
      })
  ];
};

export const updateExceptPassword = () => {
  return [body('password').not().exists().withMessage('you cannot update password')];
};
