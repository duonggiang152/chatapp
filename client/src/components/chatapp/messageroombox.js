import { useState, useEffect, useRef, useContext } from "react"
import { ControleCurrenRoomContext, ChatContext } from "./context"
import "./css/messageroombox.css"
import "./css/textmessage.css"

import { Avartar } from "./avartar"
import RoomController from "../../controller/roomController"
import UserController from "../../controller/userController"

function TextMessage(props) {
    let _class_private = "";
    console.log(props.isYou)
    if (props.isYou) {
        console.log("run")
        _class_private = "message-chat message-right"
        return (
            <div style={{ width: "100%", overflow: "hidden" }} className={_class_private}>
                <div>
                    {props.message}
                </div>
            </div>
        )
    }
    else {
        _class_private = "message-chat message-left"
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
let data = [
    {
        url: "",
        id: 123,
        message: "hello, my name is giang hello, my name is giang hello, my name is giang hello, my name is giang hello, my name is giang hello, my name is giang",
        isYou: true
    },
    {
        url: "",
        id: 123,
        message: "hello, my name is giang",
        isYou: false
    }
]
function MessageRoomBox(props) {
    const [currentRoom, setCurrentRoom] = useState()
    const curretRoomContext = useContext(ControleCurrenRoomContext)
    const chatContext = useContext(ChatContext)
    const texmessagebox = useRef(null);
    const [loginUser, setLoginUser] = useState()
    const [message, setMesssage] = useState([])
    const testF = async () => {
        // console.log(currentRoom)
        // console.log(chatContext)
        const room = await RoomController.getRoomByID(curretRoomContext.currenOpenRoomID)
        if(!room) return
        console.log("-----------------123")
        const message = await room.getMessage(undefined, 30)
        message.forEach((element , i) => {
            const isYou = (element.userID === loginUser.id ? true : false)
            console.log(isYou)
            message[i] = {
                ...element,
                isYou: isYou
            }
        });
        message.reverse()
        setMesssage(message)
        console.log("-----------------123")
    }
    
    useEffect(() => {
       
        const callAPI = async () => {
            const loginuser = await UserController.getLoginUser()
            setLoginUser(loginuser)
            console.log(loginuser)   
        }
        texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight;
        callAPI()
    }, [])
    useEffect(() => {
        testF()
        if(curretRoomContext.currenOpenRoomID !== currentRoom ) {
        setCurrentRoom(curretRoomContext.currenOpenRoomID)
        }
    }, [props])
    if (!currentRoom) {
        return (
            <div ref={texmessagebox} className={"message-room-box"} style={{ height: `calc(${props.height})` }}>
            </div>
        )
    }
    return (
        <div ref={texmessagebox} className={"message-room-box"} style={{ height: `calc(${props.height})` }}>
            {
                message.map(Element => {
                    // console.log(Element)
                    return <TextMessage {...Element} />
                })
            }
        </div>
    )
}
export { MessageRoomBox }