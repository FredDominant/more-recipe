import isEmpty from 'lodash.isempty';
import Validator from 'validator';

const resetPasswordValidator = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(data.password, {
    min: 6, max: 50
  })) {
    errors.password = 'Password should be at least 6 characters';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'You need to confirm password';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.password = 'Passwords don\'t match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default resetPasswordValidator;
