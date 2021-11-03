const { Tag } = require('../models');

const tagData = [
  {
    id: 1,
    name: 'Made from scratch'
  },
  {
    id: 2,
    name: 'Must visit Pizza place'
  },
  {
    id: 3,
    name: 'For the love of Pizza'
  }
];

const seedTags = () => Tag.bulkCreate(tagData);

module.exports = seedTags;