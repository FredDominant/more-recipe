import Validator from 'validator';
import isEmpty from 'lodash.isempty';

const recoverPasswordValidator = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email field is required';
  }
  if (!(Validator.isEmail(data.email))) {
    errors.email = 'Invalid Email';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};
export default recoverPasswordValidator;
