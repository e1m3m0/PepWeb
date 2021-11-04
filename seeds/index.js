const seedTags = require('./tags');
const seedUsers = require('./users');
const seedPosts = require('./posts');
const seedReactions = require('./reactions');
const seedComments = require('./comments');

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

  await seedReactions();
  console.log('--------------');

  await seedComments();
  console.log('--------------');

  process.exit(0);
};

seedAll();