const seedTags = require('./tags');
const seedUsers = require('./users');
const seedPosts = require('./posts');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  await seedUsers();
  console.log('--------------');
  
  await seedTags();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');


  process.exit(0);
};

seedAll();