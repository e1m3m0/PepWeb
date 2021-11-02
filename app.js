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

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
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



/*


const Sequelize = require('sequelize');
require('dotenv').config()
const express = require('express');
const app = express();
const AWS = require('aws-sdk');
bodyParser = require('body-parser')
const path = require('path');
const multer = require('multer');
const Jimp = require("jimp");
const { info } = require('console');

//////
router = express.Router()

const storage = multer.memoryStorage();
const upload = multer({storage: s_USER='root'
DB_PW='Ihatethisback-endcrap!666'torage});
//const upload = multer('multer');


const port = process.env.PORmagesT || 3001

 // Connect to server ================================================================

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
      dialectOptions: {
        decimalNumbers: true,
      },
    });




// Add photo ===========================================================================
router.post('/images', upload.single('file'), async (req, res) => {

    console.log("heres ur post")
    let info = req.body;

    try {
      const image = req.file;
    
      const file = await Jimp.read(Buffer.from(image.buffer, 'base64'))
        .then(async image => {
          const background = await Jimp.read('https://url/background.png');
          const font = await Jimp.loadFont(Jimp.FONT_SANS_32_WHITE);

          image.resize(Jimp.AUTO, 900);
          image.composite(background, 1000, 700);
          image.print(font, 1000, 700, 'Logo');
          return image.getBufferAsync(Jimp.AUTO);
        })
        .catch(err => {
          res.status(500).json({ msg: 'Server Error -2984759328457', error: err });
        });

      const s3FileURL = process.env.AWS_Uploaded_File_URL_LINK;

      let s3bucket = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      });
      B_USER='root'
      DB_PW='Ihatethisback-endcrap!666'
      //Where you want to store your file ================================================

      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: image.originalname,
        Body: file,
        ContentType: image.mimetype,
        ACL: 'public-read'
      };

      s3bucket.upload(params, async (err, data) => {
        try {
          if (err) {
            res.status(500).json({ error: true, Message: err });
          } else {
            const newFileUploaded = {
              description: req.body.description,
              fileLink: s3FileURL + image.originalname,
              s3_key: params.Key
            };
            info = { ...info, photo: newFileUploaded.fileLink };
            // Add all info to database after store picture to S3
            const photos = await database.addPhoto(db, info);
            res.send(photos);
          }
        } catch (err) {
          res.status(500).json({ msg: 'Server Error - asd;flkajsd;flkj', error: err });
      
//------------------------------------------------------
//LATEST-ANSWER @ March-2018 [ES8 STYLE]
//multi-part direct upload to s3 without saving on local disk
//Web Link=> http://stackoverflow.com/a/35902286/3539857
//OTHER IMPLEMENTATIONS=> see app.js in current directory
//Run : node app.js
//------------------------------------------------------

const express = require('express'); //"^4.13.4"
const aws = require('aws-sdk'); //"^2.2.41"
const bodyParser = require('body-parser');
const multer = require('multer'); // "^1.3.0"
const multerS3 = require('multer-s3'); //"^2.7.0"

aws.config.update({
    secretAccessKey: 'YOUR_ACCESS_SECRET_KEY',
    accessKeyId: 'YOUR_ACCESS_KEY_ID',
    region: 'us-east-1'
});

const app = express();
const s3 = new aws.S3();

app.use(bodyParser.json());

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'YOUR_BUCKET_NAME',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

//open http://localhost:3000/ in browser to see upload form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//used by upload form
app.post('/upload', upload.array('upl',1), (req, res, next) => {
    res.send("Uploaded!");
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});


//------------------------------------------------------
//NEW-ANSWER @ DEC-2016 [ES5 STYLE]
//------------------------------------------------------

/* SEE app.js in current directory Line#13*/ // }
//      });
//    } catch (err) {
//      res.status(500).json({ msg: 'Server Error- bbbbbb', error: err });
//    } 
//});



// app.listen(port, () => {
//     console.log('Server is up on port ' + port); 
// })

  