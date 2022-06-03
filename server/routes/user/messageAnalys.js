/**
 * module dependencies
 */
 const express = require("express");
 const ChatMessage =require("../../model/message")
 const router = express.Router()
 router.get("/", async (req, res) => {
   try {
     const data = await ChatMessage.getCountMessage()
     return res.status(200).json(data)
   } catch (err) {
     console.log(err)
     return res.status(500).json({ message: "Lỗi hệ thống" })
   }
 })
 
 module.exports = router