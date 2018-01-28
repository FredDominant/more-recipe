import faker from 'faker';

export default {
  validUser: {
    firstName: 'fred',
    lastName: 'freddy',
    email: 'fredadewole@email.com',
    password: '123456',
    confirmPassword: '123456'
  },
  validSignup: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '123456',
    confirmPassword: '123456'
  },
  invalidEmail: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: 'njancnsnvn',
    password: '123456',
    confirmPassword: '123456'
  },
  unmatchingPassword: {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '123456789',
    confirmPassword: '123456'
  },
  missingName: {
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: '123456',
    confirmPassword: '123456'
  },
  alreadyTakenEmail: {
    lastName: 'faker.name.lastName()',
    email: 'fredadewole@email.com',
    password: '123456',
    confirmPassword: '123456'
  },
  unregisteredLogin: {
    email: faker.internet.email(),
    password: '123456',
  },
  validLogin: {
    email: 'fredadewole@email.com',
    password: '123456'
  },
  invalidLogin: {
    email: '',
    password: '123456'
  }
};

