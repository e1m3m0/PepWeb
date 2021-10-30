const express = require('express')
const sequelize = require('./config/connection');

// const fs = require("fs")
// const util = require("util")
// const unlinkFile = utils.promisify(fs.unlink)

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile } = require("./s3")

const app = express()
const PORT = process.env.PORT || 3306;

app.get('/images/:key', (req, res) => {
  console.log(req.params)
  const key = req.params.key
  const readStream = getFileStream(key)

  readStream.pipe(res)
})

app.post("/images", upload,single("image"), async (req, res) => {
    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    // await unlinkFile(file.path)
    
    // apply filter
  // resize 

    const result = await uploadFile(file)
    console.log(result)
    await uploadFile(file)
    const decription = req.body.description
    res.send({imagePath: `/images/${results.Key}`})
})

app.listen(PORT, () => 
  console.log(`App listening on port ${PORT}!`))
