const { Tag } = require('../models');

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

module.exports = seedTags;