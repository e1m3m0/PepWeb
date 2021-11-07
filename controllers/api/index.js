const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes');
const tagRoutes = require('./tagRoutes');
const reactionRoutes = require('./reactionRoutes');
// const photoRoutes = require('./photoRoutes');


router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);
router.use('/tags', tagRoutes);
router.use('/reactions', reactionRoutes);
// router.use('/photos', photoRoutes);


module.exports = router;