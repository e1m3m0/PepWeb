const router = require("express").Router();
const { Post, User, Tag } = require("../../models");

router.get("/", (req, res) => {
  Tag.findAll()
    .then((dbTagData) => res.json(dbTagData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/:id", (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Post,
        attributes: ["id", "title", "created_at",],
        order: [["created-at", "DESC"]],
        include: [
          {
            model: User,
            attributes: ["username"],
          },
        ],
      },
    ],
  })
    .then((dbPostData) => res.json(dbPostData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
