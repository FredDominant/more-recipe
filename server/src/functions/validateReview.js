import validator from 'validator';
import isEmpty from 'lodash.isempty';

const validateReview = (input) => {
  const errors = {};
  if (validator.isEmpty(input.content)) {
    errors.content = 'Review content is empty!';
  }
  return {
    errors,
    isvalid: isEmpty(errors)
  };
};

export default validateReview;
