import isEmpty from 'lodash.isempty';
import Validator from 'validator';

const updatePasswordValidator = (password, confirmPassword) => {
  const errors = {};
  if (password) {
    if (!Validator.isLength(password, {
      min: 6, max: 50
    })) {
      errors.password = 'Password must be between 6 and 50 characters';
    }
    if (Validator.isEmpty(confirmPassword)) {
      errors.confirmPassword = 'You need to confirm password';
    }
    if (!Validator.equals(password, confirmPassword)) {
      errors.password = 'Passwords don\'t match';
      errors.confirmPassword = 'Passwords don\'t match';
    }
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default updatePasswordValidator;
