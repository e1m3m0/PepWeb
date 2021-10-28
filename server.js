const express = require("express")
const app = express()
const users = []

app.set("view-engine", "ejs" )
app.use(express.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.render("index.ejs" , {name: "ANTONIO"})
})

app.get("/login", (req,res) => {
    res.render("login.ejs")
})

app.post("/login", (req, res) => {
    
})

app.get("/register", (req,res) => {
    res.render("register.ejs")
})

app.post("/register", (req, res) => {
    users.push({
        id:Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
    res.redirect("/login")
    console.log(users)
})

app.listen(3000)