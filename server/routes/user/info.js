const express = require('express')
const User = require('../../model/user')



const router = express.Router()


router.get('/:id',async (req, res) => {
    let userID;
    try {
        userID = parseInt(req.params.id)
    }
    catch(err) {

    }
    if(!userID) {
        res.status(404)
        return res.send({message: "err"})
    }
    await User.getUserById(userID)
              .then(user => {
                  if(!user) {
                      res.status(404)
                      return res.send({message: "user don't exist"})
                  }
                  res.status(200)
                  return res.send({
                      id: user.idUser,
                      userName: user.userName
                  })
              })
              .catch(err => {
                res.status(404)
                return res.send({message: "err"})
              })
})



module.exports = router