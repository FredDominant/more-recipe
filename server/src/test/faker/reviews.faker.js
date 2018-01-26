import faker from 'faker';

export default {
  validReview: {
    content: faker.lorem.sentence()
  },
  invalidReview: {
    content: ''
  }
};

