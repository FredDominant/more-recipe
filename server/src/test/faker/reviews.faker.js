import faker from 'faker';

export default {
  validReview: {
    content: faker.lorem.words()
  },
  invalidReview: {
    content: ''
  }
};

