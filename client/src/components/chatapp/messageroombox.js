import { useState, useEffect, useRef, useContext } from "react"
import { ControleCurrenRoomContext, ChatContext, NewMessageContext } from "./context"
import "./css/messageroombox.css"
import "./css/textmessage.css"

import { Avartar } from "./avartar"
import RoomController from "../../controller/roomController"
import UserController from "../../controller/userController"
import socketIO from "../../controller/socketIO"

function TextMessage(props) {
    let _class_private = "";
    if (props.isYou) {
        _class_private = `message-chat message-right ${props.isYou}`
        return (
            <div style={{ width: "100%", overflow: "hidden" }} className={_class_private}>
                <div>
                    {props.message}
                </div>
            </div>
        )
    }
    else {
        _class_private = `message-chat message-left ${props.isYou}`
        return (
            <div className={_class_private}>
                <Avartar small {...props} />
                <p>
                    {props.message}
                </p>
            </div>
        )
    }
}
function MessageRoomBox(props) {
    const [currentRoom, setCurrentRoom] = useState()
    const curretRoomContext = useContext(ControleCurrenRoomContext)
    const chatContext = useContext(ChatContext)
    const texmessagebox = useRef(null);
    const [loginUser, setLoginUser] = useState()
    const [message, setMesssage] = useState([])
    const initMessage = async () => {
        const room = await RoomController.getRoomByID(curretRoomContext.currenOpenRoomID)
        if (!room) return
        const message = await room.getMessage(undefined, 50)
        message.forEach((element, i) => {
            if (message[i].isYou === undefined) {
                const isYou = (element.userID === loginUser.id ? true : false)
                message[i] = {
                    ...element,
                    isYou: isYou
                }
            }
        });
        message.reverse()
        props.setMessageData(message)
    }
    const [renderfrist, setRenerfrist] = useState(false)
    useEffect(() => {
        texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight;
    })
    useEffect(() => {
        socketIO.listen('new-message', async message => {
            newMessageContext.setNewMessage(newMessageContext.state + 1)
            const room = await RoomController.getRoomByID(message.cbID)
            await room.addMessage(message, true)
            props.setMessageData([...props.data_in, message])
            texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight;
        })
    }, [props])
    const newMessageContext = useContext(NewMessageContext)
    useEffect(() => {

        const callAPI = async () => {
            const loginuser = await UserController.getLoginUser()

            setLoginUser(loginuser)
        }
        texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight;
        callAPI()
    }, [props])
    useEffect(() => {
        if (props.inputFocus) texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight;
        if (curretRoomContext.currenOpenRoomID !== currentRoom) {
            setCurrentRoom(curretRoomContext.currenOpenRoomID)
            initMessage()
        }
    }, [props])
    console.log(props.data_in)
    const data = props.data_in
    if (!currentRoom) {
        return (
            <div ref={texmessagebox} className={"message-room-box"} style={{ height: `calc(${props.height})` }}>
            </div>
        )
    }
    return (
        <div ref={texmessagebox} className={"message-room-box"} style={{ height: `calc(${props.height})` }}>
            {
                data.map(Element => {
                    return <TextMessage {...Element} />
                })
            }
        </div>
    )
}
export { MessageRoomBox }