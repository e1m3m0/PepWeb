const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport, getUserEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserEmail(email);
        if (user == null) {
            return done(null, false, { message: " EMAIL not associated with any user" })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: "Incorrect Password try again" })
            }
        } catch (e) {
            return done(e);
        }
    
    }
    passport.use(new LocalStrategy({ usernameField: "email"}, 
    authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
         return done(null, getUserById(id))
    })

}

module.exports = initialize 