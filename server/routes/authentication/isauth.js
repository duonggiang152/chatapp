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
  * @method GET
  */
 router.get("/", (req, res) => {
     if(req.isAuthenticated()) {
         res.status("200")
         return res.send({isauth: true})
     }
     res.status("404")
     return res.send({isauth: false})
 })

module.exports = router