const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class Reaction extends Model {}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reaction_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
<<<<<<< HEAD
  sequelize,
  timestamps: false,
  freezeTableName: true,
  underscored: true,
  modelName: 'reaction'
  }
=======
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'reaction'
    }
>>>>>>> 5236ee22c986523b645e094e1b0da407e681bb12
)

module.exports = Reaction;