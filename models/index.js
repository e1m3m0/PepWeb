const User = require('./User');
const Post = require('./Post');
const Tag = require('./Tag');
const Comment = require('./Comment');
const Reaction = require('./Reaction');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Reaction.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.belongsTo(Tag, {
  foreignKey: 'tag_id'
});

Post.hasMany(Reaction, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Tag, Comment, Reaction };