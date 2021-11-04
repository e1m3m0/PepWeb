const { Reaction } = require('../models');

const reactionData = [
  {
    reaction_id: 1,
    post_id: 1,
    user_id: 1
  },
  {
    reaction_id: 1,
    post_id: 1,
    user_id: 2
  },
  {
    reaction_id: 2,
    post_id: 1,
    user_id: 3
  },
  {
    reaction_id: 3,
    post_id: 1,
    user_id: 4
  },
  {
    reaction_id: 2,
    post_id: 2,
    user_id: 3
  },
  {
    reaction_id: 1,
    post_id: 2,
    user_id: 1
  },
  {
    reaction_id: 1,
    post_id: 2,
    user_id: 2
  },
  {
    reaction_id: 3,
    post_id: 3,
    user_id: 1
  },
];

const seedReaction = () => Reaction.bulkCreate(reactionData);

module.exports = seedReaction;