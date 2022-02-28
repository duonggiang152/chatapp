/**
 * Module dependencies
 */
const express = require("express")
const User    = require("../../model/user")
/**
 * Private variable
 */

const router = express.Router()


/**
 * Register
 * @method POST
 */

router.post("/", async (req, res) => {
    User.addUser(req.body.userName, req.body.password)
        .then(result => {
            if(result) {
                res.status(200)
                return res.send("/login")
            }
            else { 
                res.status(404)
                return res.send({message: "UserName Existed"})
            }
        })
        .catch(err => {
            res.status("404")
            return res.send({message: "System Err"})
        })
})


/**
 * Export modul
 */

module.exports = router