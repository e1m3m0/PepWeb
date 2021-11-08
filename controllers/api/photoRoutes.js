// const router = require('express').Router();
// const aws = require('aws-sdk');

// const multer = require('multer');
// const multerS3 = require('multer-s3');
// const bodyParser = require('body-parser');
// var photo; 

// aws.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_BUCKET_REGION
// });

// const s3 = new aws.S3();


// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
//   }
// }

// router.use(bodyParser.json);

// const upload = multer({  
//   fileFilter,
//   storage: multerS3({
//     s3: s3,
//     bucket: process.env.AWS_BUCKET_NAME,
//     key: function (req, file, cb) {
//       console.log(file);
//       cb(null, Date.now().toString()); //use Date.now() for unique file keys
//     }
//   })
// });

// router.post('/upload', upload.array('upl', 1), function(req, res, next) {
//   console.log('here in multer');
//   photo = req.files[0].key;

//   console.log(photo);

//   displayPhoto()

//   .then((img) => {

//     let image = "<img src='data:image/jpeg;base64," + encode(img.Body) + "'" + "/>";
//     let startHTML = "<html><body></body>";
//     let endHTML = "</body></html>";
//     let html = startHTML + image + endHTML;
//     console.log(html)
//   })//.catch((e)=>{
// //     res.send(e)
// //})
  
// })
// // var bucket = new aws.S3({ params: { Bucket: 'pepweb' } });
// // bucket.listObjects(function (err, data) {
// //   if (err) {
// //     console.log(err);
// //   } else {
// //     console.log(data);
// //     router.get.allImageData = data.Contents;
// //   }
// // });



// async function displayPhoto() {
//   /*   aws.config.update({
//      accessKeyId: process.env.AWS_ACCESS_KEY, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY});
//      aws.config.region = process.env.AWS_BUCKET_REGION;
//      var bucket = new aws.S3({params: {Bucket: 'pepweb'}});
//      console.log("hello")
//      bucket.getObject({Key: picturename},function(err,file){
//      $timeout(function(){
//          app.s3url = "dbodyata:image/jpeg;base64," + encode(file.Body);
//      },1);
     
//  });
//  }*/

//   let bucket = new aws.S3();

//   const data = bucket.getObject({
//     Bucket: 'pepweb',
//     Key: photo
//   }).promise();
//   return data;
// }


// function encode(data) {
//   let buf = Buffer.from(data);
//   let base64 = buf.toString('base64');
//   return base64
// }




// module.exports = router;
//_______________________________________


require('dotenv').config()
const router = require('express').Router();
const aws = require('aws-sdk');
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

// const app = express(),
const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false);
  }
}

// router.use(bodyParser.json());

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


//used by upload form
router.post('/upload', upload.array('upl', 1), function (req, res, next) {
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



router.get.s3Url = 'https://pepweb.s3.us-east-1.amazonaws.com/key';
var bucket = new aws.S3({ params: { Bucket: 'pepweb' } });
bucket.listObjects(function (err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
    router.get.allImageData = data.Contents;
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
    Bucket: process.env.AWS_BUCKET_NAME,
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

module.exports = router;
