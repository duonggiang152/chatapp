/**
 * Module dependencies
 * @private
 */
const express = require("express")
const passport = require("../../config/passportconfig")

/**
 * local variable
 * @private
 */
const router = express.Router()

/**
 * Login route
 * @method POST
 */
 router.post("/",
            (req, res, next) => {
                passport.authenticate(
                    'local',
                    (err, user) => {
                        if(err) {
                            console.log(err)
                            res.status('400')
                            return res.send({message: "Authenticate failed1"})
                        }
                        if(!user) {
                            res.status("400")
                            return res.send({message: "Username is wrong or password not correct"})
                        }
                        req.login(user, (err) => {
                            if(err) {
                                console.log(err)
                                res.status('400')
                                return res.send({message: "Authenticate failed2"})
                            }
                            res.status('200')
                            return res.send({message: "Authenticated"})
                        })
                    }
                )(req, res, next)
            },
            
)

module.exports = router