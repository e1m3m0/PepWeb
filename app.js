require('dotenv').config()
const express = require('express');
aws = require('aws-sdk');
bodyParser = require('body-parser')
const path = require('path');

const multer = require('multer');
multerS3 = require('multer-s3');
const port = process.env.PORT || 3000

aws.config.update({
    secretAccessKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    accessKeyId: 'XXXXXXXXXXXXXXX',
    region: 'us-east-1'
});
const app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'pepweb',
        key: function (req, file, cb) {
            console.log(file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

//open in browser to see upload form
app.get('/', function (req, res) {
    res.send(req.file + '/images');//index.html is inside node-cheat
});

//use by upload form
app.post('/upload', upload.array('upl',1), function (req, res, next) {
    res.send("Uploaded!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

// app.get("/", (req, res) => { 
//     res.send("Hello People"); 
// });
// app.listen(port, () => {
//     console.log('Server is up on port ' + port);
// })

// const imageStorage = multer.diskStorage({
//   // Destination to store image     
//   destination: 'images', 
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '_' + Date.now() 
//            + path.extname(file.originalname))
//           // file.fieldname is name of the field (image)
//           // path.extname get the uploaded file extension
//   }
// });
// const imageUpload = multer({
//   storage: imageStorage,
//   limits: {
//     fileSize: 100000000 // 1000000 Bytes = 1 MB
//   },
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg)$/)) { 
//        // upload only png and jpg format
//        return cb(new Error('Please upload a Image'))
//      }
//    cb(undefined, true)
// }
// }) 
// // For Single image upload
// app.post('/uploadImage', imageUpload.single('image'), (req, res) => {
//   res.send(req.file)
// }, (error, req, res, next) => {
//   //res.status(400).send({ error: error.message })
//   res.status(400).send('The error field is -' + error.field)
// })