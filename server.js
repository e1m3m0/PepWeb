// if (process.env.NODE_ENV !== "production" ) {
//     require("dotenv").config()
// }

const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

// const bcrypt = require("bcrypt")
// const passport = require("passport")
// const flash = require("express-flash")
// const methodOverride = require("method-override")
// const initializePassport = require("./passport-config")

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

const helpers = require('./utils/helpers')
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('./controllers/'));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});

// // enticated()  {
// //       return res.redirect("/")
// //     }
// //     next()
// // }

// if (process.env.NODE_ENV !== "production" ) {
//     require("dotenv").config()
// }

// initializePassport (
//     passport, 
//     email => users.find(user => user.email === email),
//     id => users.find(user => user.id === id)
// )

// const base = ("./db/schema.sql")

// //app.set("view-engine", "ejs" )
// app.use(flash())
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
// }))


// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride ("_method"))

// //app.get("/", checkAuthenticated, (req, res) => {
//     //res.render("index.ejs" , {name: req.user.name })
// //})

// app.get("/login", checkNotAuthenticated, (req,res) => {
//     res.render("login.ejs")
// })

// app.post("/login", checkNotAuthenticated , passport.authenticate ("local", {
//     successRedirect: "/",
//     failureRedirect: "/login",
//     failureFlash: true
// }))

// app.get("/register", checkNotAuthenticated, (req,res) => {
//     res.render("register.ejs")
// })

// app.post("/register", checkNotAuthenticated, async (req, res) => {
//     try {
//         const hashPassword = await bcrypt.hash(req.body.password, 10)
//         users.push({
//             id:Date.now().toString(),
//             name: req.body.name,
//             email: req.body.email,
//             password: hashPassword
//         })
//         res.redirect("/login")
        
//     } catch {
//         res.redirect("/register")
//     }   console.log(base)
// })

// app.delete("/logout", (req, res) => {
//     req.logOut()
//     res.redirect("/login")
// })

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect("/login")
// }
// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//       return res.redirect("/")
//     }
//     next()
// }


// app.listen(3000)