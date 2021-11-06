const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment, Tag, Reaction } = require('../models');

router.get("/", (req, res) => {
  Post.findAll({
    order: [["created_at", "DESC"]],
    attributes: [
      "id",
      "title",
      "post_text",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM reaction WHERE post.id = reaction.post_id)"
        ),
         "reaction_count",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
        ),
        "comment_count",
      ],
    ],
    include: [
      {
        model: Reaction,
        attributes: ["reaction_id", "user_id"],
      },
      {
        model: Tag,
        attributes: ["id", "name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username", "id"],
        },
      },
      {
        model: User,
        attributes: ["username", "id"],
      },
    ],
  })
  .then(dbPOstData => {
    const posts = dbPOstData.map(post => post.get({ plain: true }));

    res.render('homepage', {
      posts, 
      loggedIn: req.session.loggedIn
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: [
      "id",
      "title",
      "post_text",
      "created_at",
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM reaction WHERE post.id = reaction.post_id)"
        ),
         "reaction_count",
      ],
      [
        sequelize.literal(
          "(SELECT COUNT(*) FROM comment WHERE post.id = comment.post_id)"
        ),
        "comment_count",
      ],
    ],
    include: [
      {
        model: Reaction,
        attributes: ["reaction_id", "user_id"],
      },
      {
        model: Tag,
        attributes: ["id", "name"],
      },
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username", "id"],
        },
      },
      {
        model: User,
        attributes: ["username", "id"],
      },
    ],
  })
  .then(dbPostData => {
    if (!dbPostData) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    
    const post = dbPostData.get({ plain: true });

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
    .then(dbReactionData => {
      const reactions = dbReactionData.map(reaction => reaction.get({ plain: true }));

      console.log(reactions);

      res.render('single-post', {
        post: post,
        reactions: reactions,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
  });
});

router.get('/add-post/', (req, res) => {
  if (req.session.loggedIn) {
  res.render('add-post');
  return;
  }

  res.render('login-signup');
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  
  res.render('login-signup');
});

router.get('/testphotos/', (req, res) => {
  if (req.session.loggedIn) {
  res.render('testphotos');
  return;
  }

  res.render('login-signup');
});

      
module.exports = router;