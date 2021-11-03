require('dotenv').config()
const express = require('express');
aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3'); 

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});

const app = express(),
    s3 = new aws.S3();

    const fileFilter = (req, file, cb) => {
      if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
      }
    }

app.use(bodyParser.json());

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

//open in browser to see upload form
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//used by upload form
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

module.exports = upload;