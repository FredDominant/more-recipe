import faker from 'faker';

export default {
  validUser: {
    firstname: 'fred',
    lastname: 'freddy',
    email: 'fredadewole@email.com',
    password: '123456',
    confirmPassword: '123456'
  },
  validSignup: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: '123456',
    confirmPassword: '123456'
  },
  invalidEmail: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: 'njancnsnvn',
    password: '123456',
    confirmPassword: '123456'
  },
  unmatchingPassword: {
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: '123456789',
    confirmPassword: '123456'
  },
  missingName: {
    lastname: faker.name.lastName(),
    email: faker.internet.email(),
    password: '123456',
    confirmPassword: '123456'
  },
  alreadyTakenEmail: {
    lastname: 'faker.name.lastName()',
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

