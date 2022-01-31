'use-strict'

/**
 * Module Dependencies
 */
const passport = require("passport")
const LocalStrategy = require("passport-local")
const User = require("../model/user")
/**
 * middleware passport 
 */
passport.use(new LocalStrategy({
                usernameField: 'userName',
                passwordField: 'password'
            },
            async (username, password, done) => {
                // checking if userName exist
                User.isExistUser(username)
                    .then(isUserExist => {
                        if(isUserExist) {
                            User.GetUserByAccountAndPassword(username, password)
                                .then(user => {
                                    if(user !== null) {
                                        return done(null, user)
                                    }
                                    else {
                                        return done(null, false, {message: "Incorrect Password"})
                                    }
                                })
                                .catch(err => {
                                    return done(err)
                                })                 
                        }
                        else {
                            return done(null, false, {message: "Incorrect UserName"})
                        }
                    })
                    .catch(err => {
                        return done(err)
                    })
               
            }
) )

passport.serializeUser((user, done) => {
    done(null, user.idUser)
})
passport.deserializeUser(async (id, done) => {
    User.getUserById(id)
        .then(data => {
            done(null, {id: data.idUser,
                        username: data.userName})
        })
        .catch(err => {
            done(err, null)
        })
})
/**
 * expose passport
 */
 module.exports = passport