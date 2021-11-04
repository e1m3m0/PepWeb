require('dotenv').config()
const express = require('express');
aws = require('aws-sdk');
const bodyParser = require('body-parser');
const multer = require('multer');
const multerS3 = require('multer-s3');
var picturename;
//const $timeout = $timeout;

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
app.post('/upload', upload.array('upl', 1), function (req, res, next) {
  picturename = req.files[0].key
  //console.log(req.files)
  displayPhoto()

    .then((img) => {

      let image = "<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
      let startHTML = "<html><body></body>";
      let endHTML = "</body></html>";
      let html = startHTML + image + endHTML;
      res.send(html)
    })//.catch((e)=>{
  //     res.send(e)
  //})
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get.s3Url = 'https://pepweb.s3.us-east-1.amazonaws.com/key';
var bucket = new aws.S3({ params: { Bucket: 'pepweb' } });
bucket.listObjects(function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    app.get.allImageData = data.Contents;
  }
});



async function displayPhoto() {
  /*   aws.config.update({
     accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
     aws.config.region = process.env.AWS_BUCKET_REGION;
     var bucket = new aws.S3({params: {Bucket: 'pepweb'}});
     console.log("hello")
     bucket.getObject({Key: picturename},function(err,file){
     $timeout(function(){
         app.s3url = "dbodyata:image/jpeg;base64," + encode(file.Body);
     },1);
     
 });
 }*/

  let bucket = new aws.S3();

  const data = bucket.getObject({
    Bucket: 'pepweb',
    Key: picturename
  }).promise();
  return data;
}


function encode(data) {
  let buf = Buffer.from(data);
  let base64 = buf.toString('base64');
  return base64
}




/*
function encode(data)
{
    var str = data.reduce(function(a,b){ return a+String.fromCharCode(b) },'');
    return btoa(str).replace(/.{76}(?=.)/g,'$&\n');
}*/

module.exports = upload;