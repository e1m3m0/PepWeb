const express = require('express')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const { uploadFile } = require("./s3")

const app = express()
const PORT = process.env.PORT || 3001;

app.post("/images", upload,single("image"), async (req, res) => {
    const file = req.file
    console.log(file)
    const result = await uploadFile(file)
    console.log(result)
    await uploadFile(file)
    const decription = req.body.description
    res.send("🔥")
})

app.listen(PORT, () => 
  console.log(`App listening on port ${PORT}!`))
