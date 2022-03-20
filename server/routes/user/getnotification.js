const express = require('express');
const UserNotification = require('../../model/usernotification');


const router = express.Router()

router.get('/', async (req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    // userid
    const userID = req.user.id
    // param
    let offsetID = req.query.offsetid
    let limit    = req.query.limit
    if(!offsetID) {
        await UserNotification.getUserNotification(req.user.id)
                                .then(notifications => {
                                    res.status(200)
                                    return res.send(notifications)
                                })
                                .catch(err => {
                                    res.status("404")
                                    return res.send({message: "err"});
                                })
        return
        
    }
    if(!limit)    limit    = 10
    // get notification
    await UserNotification.getUserNotification(req.user.id,offsetID, limit)
                            .then(notifications => {
                                res.status(200)
                                return res.send(notifications)
                            })
                            .catch(err => {
                                res.status("404")
                                return res.send({message: "err"});
                            })
    return
})
router.post('/read/:id', async (req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    // userid
    const userID = req.user.id
    // param
    let ntfID;
    try {
    ntfID = parseInt(req.params.id)
    } catch(err) {
        ntfID = undefined
        
    }
    if(!ntfID) {
        res.status(404)
        return res.send({message: "err"})
    }
    // checking if user have that notificatio
    const notification = await UserNotification.getNotificationByID(ntfID)
                                               .catch(err => {
                                                   console.log(err)
                                                   res.status(404)
                                                   res.send({message: "err"})
                                                   return null
                                               })
    if(!notification) return
    if(notification.userID !== userID) {
        res.status(404)
        return res.send({message: "err"})
    }
    await UserNotification.changeStatusNotification(ntfID,1)
    res.status(200)
    return res.send()
})
router.get('/unread', async (req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    // userid
    const userID = req.user.id
    await UserNotification.getUnreadNotification(userID)
                    .then(unreadNoti => {
                        res.status(200)
                        return res.send({unreadNoti: unreadNoti})
                    })
                    .catch(err => {
                        res.status(404)
                        return res.send({unreadNoti: unreadNoti})
                    })
})
module.exports = router