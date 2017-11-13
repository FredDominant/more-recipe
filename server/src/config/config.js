const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: 'postgres',
    password: 'Olasunkanmi94',
    database: 'recipes',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'postgres',
    password: 'Olasunkanmi94',
    database: 'test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: 'false'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
