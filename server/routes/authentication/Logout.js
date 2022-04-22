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

 router.post("/", (req, res) => {
     req.logout();
     res.status(200).json({message: "You are logout"})
 })


 module.exports = router