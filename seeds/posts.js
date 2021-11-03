const { Post } = require('../models');

const postdata = [
  {
    title: 'Perfect homemade 4 cheese pizza',
    post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user_id: 1,
    tag_id: 1
  },
  {
    title: 'Excellent Mexican-Pizza Hybrid',
    post_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user_id: 4,
    tag_id: 2
  },
  {
    title: 'Pizza flavored tooth paste',
    post_text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    user_id: 2,
    tag_id: 3
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;