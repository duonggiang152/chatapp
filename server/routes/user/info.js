const express = require('express')
const Avatar = require('../../model/avatar')
const User = require('../../model/user')



const router = express.Router()

router.get('/profi', async (req, res) => {
    if (!req.user) {
        res.status("404")
        return res.send();
    }
    const ID = req.user.id
    await User.getUserById(ID)
        .then(async user => {
            if (!user) {
                res.status(404)
                return res.send({ message: "user don't exist" })
            }
            const avatar = await Avatar.getAvatarUrl(user.idUser).catch(err => null)
            return res.status(200).send({
                id: user.idUser,
                userName: user.userName,
                url: avatar
            })
        })
        .catch(err => {
            console.log(err)
            res.status(404)
            return res.send({ message: "err" })
        })
})

router.get('/:id', async (req, res) => {
    let userID;
    try {
        userID = parseInt(req.params.id)
    }
    catch (err) {

    }
    if (!userID) {
        res.status(404)
        return res.send({ message: "err" })
    }
    await User.getUserById(userID)
        .then(async user => {
            if (!user) {
                res.status(404)
                return res.send({ message: "user don't exist" })
            }
            const avatar = await Avatar.getAvatarUrl(user.idUser).catch(err => null)
            res.status(200)
            return res.send({
                id: user.idUser,
                userName: user.userName,
                avatar: avatar
            })
        })
        .catch(err => {
            res.status(404)
            return res.send({ message: "err" })
        })
})


module.exports = router