const { User } = require('../models');

const userdata = [
  {
    username: 'jessica',
    email: 'jessica@bootcamp.com',
    password: '1234'
  },
  {
    username: 'antonio',
    email: 'antonio@bootcamp.com',
    password: '1234'
  },
  {
    username: 'steven',
    email: 'steven@bootcamp.com',
    password: '1234'
  },
  {
    username: 'guillermo',
    email: 'guillermo@bootcamp.com',
    password: '1234'
  },
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
