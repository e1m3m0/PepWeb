const sequelize = require("../../config/connection");
const router = require("express").Router();
const { Post, User, Comment, Tag, Reaction } = require("../../models");

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
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  const post = req.params.id;
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
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/", (req, res) => {
  Post.create({
    title: req.body.title,
    post_text: req.body.post_text,
    post_photo: req.body.post_photo,
    tag_id: req.body.tag_id,
    user_id: req.body.user_id,
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/:id", (req, res) => {
  Post.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put("/react", (req, res) => {
  // custom static method created in models/Post.js
  Post.react(req.body, { Reaction, Comment, User })
    .then((dbReactionData) => res.json(dbReactionData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "No post found with this id" });
        return;
      }
      res.json(dbPostData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
