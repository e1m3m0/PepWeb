const CustomStrategy = require("passport-custom").Strategy
const bcrypt = require("bcrypt")

function initialize(passport, getUserEmail, getUserById) {
    async function authenticateUser(email, password, done) {
        const user = getUserEmail(email);
        if (user == null) {
            return done(null, false, { message: " EMAIL not associated with any user" });
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return document(null, user);
            } else {
                return done(null, false, { message: "Incorrect Password try again" });
            }
        } catch (err) {
            return done(err);
        }
        passport.use("custome-strategy", new CustomStrategy({ usernameField: "email" }, authenticateUser));
        passport.serializeUser((user, done) => done(null, user.id));
        passport.deserializeUser((id, done) => {
            return done(null, getUserById(id));
        });
    }
    //passport.use( "custome-strategy", new CustomStrategy ({ usernameField: "email" }, authenticateUser))
    // passport.serializeUser((user, done) => done(null, user.id))
    // passport.deserializeUser((id, done) => {
    //      return done(null, getUserById(id))
    // })

}

module.exports = initialize 