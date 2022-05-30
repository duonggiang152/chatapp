const express = require('express');
const ChatMessage = require('../../model/message');

const router = express.Router()

router.get('/',async (req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    // userid
    const userID = req.user.id
    // param
    let cbID     = req.query.cbid
    let offsetID = req.query.offsetid
    let limit    = req.query.limit
    if(!cbID) {
        res.status("404")
        return res.send({message: "err"});
    }
    await ChatMessage.getMessage(cbID, offsetID,limit)
                    .then(data => {
                        res.status(200)
                        return res.send({message: data})
                    })
                    .catch(err => {
                        res.status("404")
                        return res.send({message: "err"});
                    })
    return
})
module.exports = router