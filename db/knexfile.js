// Update with your config settings.
require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host : process.env.HOST,
      user :  process.env.USER_DB,
      password : '',
      database : process.env.DATABASE
    }
  },
};
