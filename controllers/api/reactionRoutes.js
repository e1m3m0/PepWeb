const router = require("express").Router();
const sequelize = require("../../config/connection");
const { Reaction, User, Post } = require("../../models");

router.get('/', (req, res) => {
  Reaction.findAll()
  .then((dbReactionData) => res.json(dbReactionData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.post('/', (req, res) => {
  Reaction.create({
    reaction_id: req.body.reaction_id,
    user_id: req.body.user_id,
    post_id: req.body.post_id,
  })
  .then((dbReactionData) => res.json(dbReactionData))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.get('/:id', (req, res) => {
  Reaction.findAll({
    where: {
      post_id: req.params.id
    },
    attributes: {
      include: [[sequelize.fn('COUNT', sequelize.col('post_id')), 'reactionCount']],
      exclude: [ 'id', 'user_id', 'post_id']
    },
    group: ['reaction_id'],
    order: [['reaction_id']],
  })
  .then((dbReactionData) => res.json(dbReactionData))
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});


module.exports = router;