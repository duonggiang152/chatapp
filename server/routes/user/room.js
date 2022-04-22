const express = require('express');
const ChatBox = require('../../model/chatbox');


const router = express.Router()
router.get('/get-room/:id', async (req, res) => {
    return await ChatBox.getChatBoxByID(req.params.id)
                .then(data => {
                    res.status(200)
                    return res.send({room: data})
                })
                .catch(err => {
                    res.status(404)
                    return res.send({message: "err"})
                })
})
router.get('/get-room/', async (req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    // userid
    const userID = req.user.id
    // param
    let offsetID = req.query.offsetid
    let limit    = req.query.limit
    await ChatBox.getChatBoxParticipate(userID, offsetID,limit)
                 .then(data => {
                     res.status(200)
                     return res.send({rooms: data })
                 })
                 .catch(err => {
                     res.status(404)
                     return res.send({message: "err"})
                 })
    return
})
router.get('/room-member/:id', async (req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    let ID
    try {
        ID = parseInt(req.params.id)
    } catch(err){

    }
    if(!ID) {
        res.status("404")
        return res.send();
    }
    await ChatBox.getMemberOfChatBox(ID)
                .then(data => {
                    res.status(200)
                    res.send({member: data})
                })
                .catch(err=> {
                    res.status("404")
                    return res.send();
                })
    return
})
module.exports = router