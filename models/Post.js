const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class Post extends Model {
  static react(body, models) {
    return models.Reaction.create({
      reaction_id: body.reaction_id,
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'post_text',
          'title',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM reaction WHERE post.id = reaction.post_id)'),
            'reaction_count'
          ]
        ]
      });
    });
  }
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    post_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    post_photo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post;