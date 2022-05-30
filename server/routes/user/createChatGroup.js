/**
 * module dependencies
 */
const express = require("express");
const ChatBox = require("../../model/chatbox");
const IOServer = require("../../controller/IOServer")
const SocketManager = require("../../controller/socketIOAppController/SocketManager")

const router = express.Router()
router.post("/", async (req, res) => {
  try {
    if (!req.user) {
      res.status("404")
      return res.send();
    }
    const ownerID = req.user.id
    const userIDs = req.body.userIDs
    let name = req.body.groupname
    if (!name) name = req.user.username
    if (typeof (userIDs) !== typeof ([]))
      throw new Error()
    if (userIDs.length <= 1)
      throw new Error()
    if (!userIDs.includes(ownerID)) {
      userIDs.unshift(ownerID)
    }
    // create group
    const idGroup = await ChatBox.createGroupChatBox(userIDs[0], userIDs[1], name)
      .then(async data => {
        for (let i = 2; i < userIDs.length; i++) {
          await ChatBox.addUser(data, userIDs[0], userIDs[i])
        }
        return data
      })
    for (let i = 0; i < userIDs.length; i++) {

      const sockets = await SocketManager.getSocket(userIDs[i])
      if(typeof(sockets) !== typeof([])) continue;
      
      sockets.forEach((socket) => {
        IOServer.io.to(socket).emit("new-update-room", {
          cbID: idGroup
        })
      })
     
    }
    return res.status(200).json({ message: " tạo thành công", id: idGroup })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Lỗi hệ thống" })
  }
})

module.exports = router