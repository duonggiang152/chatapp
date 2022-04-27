const express = require("express")
const multer = require("multer")
const router = express.Router()
const Avatar = require("./../../model/avatar")
const upload = multer()
router.post("/avatar", (req, res, next) => {
  if(!req.user) return res.status(401).json({message: "Unauthentication"})
  next()
}, upload.any(),async (req, res) => {
  try {
    const {body, files} = req
    if(!files) res.status(403).json({message: "File must have key avatar"})
    let avatar;
    for(let i = 0 ; i< files.length; i++) {
      if(files[i].fieldname === "avatar") avatar = files[i]
    }
    if(!avatar)return res.status(403).json({message: "File must have key avatar"})
    await Avatar.uploadFile(req.user.id, avatar)
    return res.status(200).send()
  } catch(err) {
    console.log(err)
    return res.status(500).json({message: "System Error"})
  }
})

module.exports = router