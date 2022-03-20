const express = require('express')
const Friend = require('../../model/friend')

const router = express.Router()

router.get('/:id',async (req, res) => {
    let id;
    try {
        id = parseInt(req.params.id)
    } catch(err) {
        console.log(err)
    }
    if(!id) {
        res.status(404)
        return res.send({message: "err"})
    }
    await Friend.isFriendRequestAccepted(id)
                .then(data => {
                    res.status(200)
                    res.send({isAccepted: data})
                })
                .catch(err => {
                    res.status(404)
                    return res.send({message: "err"})
                })
})

module.exports = router