const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create User model
class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'tag'
  }
)

module.exports = Tag;


const tagData = [
  {
    name: 'Made from scratch'
  },
  {
    name: 'Must visit Pizza place'
  },
  {
    name: 'For the love of Pizza'
  }
];

const seedTags = () => Tag.bulkCreate(tagData);

// seedTags();