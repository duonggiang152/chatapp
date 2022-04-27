/**
 * Module dependencis
 */
const express = require("express")
const ChatMessage = require("../../model/message")
const UserNotification = require("../../model/usernotification")
const QueryFailed = require("../../controller/Exception/QueryFailed")
const SystemError = require("../../controller/Exception/SystemError")
/**
 * variable
 */

const route = express.Router()

route.post("/", async (req, res) => {
    if(!req.user) {
        res.status("404")
        return res.send();
    }
    return ChatMessage.addNewChatMessage(req.body.cbID, req.user.id, req.body.message)
                      .then( async message => {
                        UserNotification.NewMessageNotification(req.user.id, message)
                        return res.send(
                            {
                                status: 200,
                                message: "message was send"
                            }
                        )
                      })
                      .catch(err => {
                        if(err instanceof SystemError) {
                            console.log(err)
                            res.status("404")
                            return res.send();
                        }
                        else if(err instanceof QueryFailed) {
                            console.log(err)
                            switch(err.errno) {
                                case 109:
                                    return res.send(  
                                    { 
                                        status: 100,
                                        message: "chat box don't exist or you not in chatbox"
                                    })
                                default:
                                    res.status("404")
                                    return res.send();
                            }
                        }
                        else {
                            console.log(err)
                            res.status("404")
                            return res.send();
                        }
                      })
})

module.exports = route