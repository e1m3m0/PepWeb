const { Comment } = require('../models');

const commentdata = [
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user_id: 1,
    post_id: 1
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user_id: 4,
    post_id: 1
  },
  {
    comment_text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    user_id: 2,
    post_id: 2
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user_id: 1,
    post_id: 2
  },
  {
    comment_text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    user_id: 4,
    post_id: 3
  },
  {
    comment_text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    user_id: 2,
    post_id: 3
  }

];

const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;