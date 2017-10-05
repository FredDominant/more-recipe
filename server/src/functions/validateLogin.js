import validator from 'validator';
import isEmpty from 'lodash.isempty';

const validateLogin = (input) => {
  const errors = {};
  if (typeof (input.email) === 'boolean') {
    errors.email = 'Invalid email';
  }
  if (validator.isEmpty(input.email)) {
    errors.email = 'Email is empty!';
  }
  if (validator.isBoolean(input.email)) {
    errors.email = 'Invalid email';
  }
  if (!(validator.isEmail(input.email))) {
    errors.email = 'Email is invalid!';
  }
  if (validator.isEmpty(input.password)) {
    errors.password = 'Password is empty!';
  }
  return {
    errors,
    isvalid: isEmpty(errors)
  };
};

export default validateLogin;
