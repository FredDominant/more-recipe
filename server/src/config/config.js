const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  development: {
    username: 'Fred',
    password: 'Olasunkanmi94',
    database: 'recipes',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL'
  }
};
