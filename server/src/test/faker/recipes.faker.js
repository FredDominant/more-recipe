import faker from 'faker';

export default {
  validRecipe: {
    name: faker.lorem.words(),
    description: faker.lorem.words(),
    directions: faker.lorem.words(),
    ingredients: faker.lorem.words()
  },
  secondValidRecipe: {
    name: faker.lorem.words(),
    description: faker.lorem.words(),
    directions: faker.lorem.words(),
    ingredients: faker.lorem.words()
  },
  thirdValidRecipe: {
    name: 'random name',
    description: faker.lorem.words(),
    directions: faker.lorem.words(),
    ingredients: faker.lorem.words()
  },
  namelessRecipe: {
    description: faker.lorem.words(),
    directions: faker.lorem.words(),
    ingredients: faker.lorem.words()
  },
  shortnameRecipe: {
    name: 'bbc',
    description: faker.lorem.words(),
    directions: faker.lorem.words(),
    ingredients: faker.lorem.words()
  },
  randomName: {
    name: faker.random.words()
  }
};

