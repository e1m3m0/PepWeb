require('dotenv').config()
const { Post } = require("../../models");
const router = require('express').Router();
const aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');



aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_BUCKET_REGION
});


const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

router.use(bodyParser.json());


const upload = multer({
  fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    key: function (req, file, cb) {
      console.log(file);
      cb(null, Date.now().toString()); //use Date.now() for unique file keys
    }
  })
});


router.post('/upload/:id', upload.array('upl'), function (req, res, next) {
  const post_photo = req.files[0].key;
  const id = req.params.id
  
  Post.update({post_photo: post_photo}, {
    where: {
      id: id
    },
  })
  .then((dbPostData) => {
    if (!dbPostData) {
      res.status(404).json({ message: "No post found with this id" });
      return;
    }
    res.redirect(`/post/${id}`);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
});

var bucket = new aws.S3({ params: { Bucket: 'pepweb' } });

module.exports = router;
