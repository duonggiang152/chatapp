import { useState, useEffect, useRef, useContext } from "react"
import { ControleCurrenRoomContext, NewMessageContext } from "./context"
import "./css/messageroombox.css"
import "./css/textmessage.css"

import { Avartar } from "./avartar"
import RoomController from "../../controller/roomController"
import UserController from "../../controller/userController"
import socketIO from "../../controller/socketIO"

function TextMessage(props) {
    let _class_private = "";
    const [url, setURL] = useState()
    useEffect(() => {
        const callAPI = async () => {
        if(!props.userID) setURL(null)
        const user = await UserController.getUserByID(props.userID)
        const userURl = await user.getAvatar()
        setURL(userURl)}
        callAPI(props.userID)
    },[props.userID])
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
                <Avartar url = {url} small {...props} />
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
    const texmessagebox = useRef(null);
    const [loginUser, setLoginUser] = useState()
    const [offSetID, setOffSetID] = useState()
    const initMessage = async () => {
        const room = await RoomController.getRoomByID(curretRoomContext.currenOpenRoomID)
                                         .catch(err =>  null)
        if (!room) return
        const message = await room.getMessage(undefined, 100)
        message.forEach(async (element, i) => {
            
            if (message[i].isYou === undefined) {
                const isYou = (element.userID === loginUser.id ? true : false)
                message[i] = {
                    ...element,
                    isYou: isYou,
                }
            }
        });
     
        
        message.reverse()
        if(message[0])
        setOffSetID(message[0].mID)
        props.setMessageData(message)
    }
    

    useEffect(() => {
        const calllAPI = async () => {
            socketIO.listen('new-message', async message => {
                newMessageContext.setNewMessage(newMessageContext.state + 1)
                const room = await RoomController.getRoomByID(message.cbID)
                message.userID = message.userId
                await room.addMessage(message, true)
                
                props.setMessageData([...props.data_in, message])
                texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight;
            })
        }
       calllAPI()
    }, [props.data_in])
   
    const newMessageContext = useContext(NewMessageContext)
    useEffect(() => {
        const callAPI = async () => {
            const loginuser = await UserController.getLoginUser()
            setLoginUser(loginuser)
        }
       
        callAPI()
    }, [props])
    useEffect(() => {
        if (props.inputFocus) texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight;
        if (curretRoomContext.currenOpenRoomID !== currentRoom) {
            setCurrentRoom(curretRoomContext.currenOpenRoomID)
            props.setMessageData([])
            initMessage()
        }
    }, [props])
    const data = props.data_in
    if (!currentRoom) {
        return (
            <div ref={texmessagebox} className={"message-room-box"} style={{ height: `calc(${props.height})` }}>
            </div>
        )
    }
    return (
        <div onScroll={ async (e) => {
            setTimeout(async () => {
                if(texmessagebox.current.scrollTop < 500) {
                    const room = await RoomController.getRoomByID(currentRoom)
                    const message = await room.getMessage(offSetID, 100)
                                            .catch(err => {
                                                return null
                                            })
                    if(!message || !message[message.length - 1] || !message[message.length - 1].mID) return
                    let offsetid = message[message.length - 1].mID
                    if(offsetid < offSetID) {
                        setOffSetID(offsetid)
                        message.reverse()
                        props.setMessageData([...message, ...data])
                    }
                
                    
                }
            }, 500);
            
            
        }} ref={texmessagebox} className={"message-room-box"} style={{ height: `calc(${props.height})` }}>
            { 
                data.map(Element => {
                    return <TextMessage {...Element} />
                })
            }
        </div>
    )
}
export { MessageRoomBox }