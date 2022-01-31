/**
 * Module dependencies
 * @private
 */
 const express = require("express")
 
 /**
  * local variable
  * @private
  */
 const router = express.Router()

 router.get("/", (req, res) => {
    if(req.isAuthenticated())
        return res.send("this is the content when you authenticated")
    else 
        return res.send("this is the content when you are unauthenticated")
 })


 module.exports = router