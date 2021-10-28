const express = require('express')

const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()
const PORT = process.env.PORT || 3001;

app.post("/images", upload,single("image"), (req, res) => {
    const file = req.file
    console.log(file)
    const decription = req.body.description
    res.send("🔥")
})

app.listen(PORT, () => 
  console.log(`App listening on port ${PORT}!`))
