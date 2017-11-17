import Validator from 'validator';
import isEmpty from 'lodash.isempty';

const loginValidator = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!(Validator.isEmail(data.email))) {
    errors.email = 'Invalid Email';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default loginValidator;
