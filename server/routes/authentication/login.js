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
 */
 router.post("/",
            (req, res, next) => {
                passport.authenticate(
                    'local',
                    (err, user) => {
                        if(err) {
                            res.status('404')
                            return res.send({message: "Authenticate failed"})
                        }
                        req.login(user, (err) => {
                            if(err) {
                                res.status('404')
                                return res.send({message: "Authenticate failed"})
                            }
                            return res.send({message: "Authenticated"})
                        })
                    }
                )(req, res, next)
            },
            
)

module.exports = router