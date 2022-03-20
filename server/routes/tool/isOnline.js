/**
 * Module dependencies
 */
const express = require("express")
const SocketManager = require("../../controller/socketIOAppController/SocketManager")

/**
 * private variable
 */

const router = express.Router()

/**
 * Check if user online or not
 */
router.get('/:userid', (req, res) => {
    try {
    const id = parseInt(req.params.userid)
    const sockets = SocketManager.getSocket(id)
    res.status(200)
    if(sockets === null) {
        return res.send({listSocket: []})
    }
    return res.send({listSocket: sockets})
    } catch(err) {
        res.status(404)
        return res.send(err)
    } 
})

module.exports = router