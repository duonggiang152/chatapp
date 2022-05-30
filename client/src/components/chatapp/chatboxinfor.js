import { useContext, useEffect, useState } from "react"
import { Avartar } from "./avartar"
import { ControleCurrenRoomContext } from "./context"
import domain from "../../config/domain"
import "./css/chatboxinfor.css"
import UserController from "../../controller/userController"
import RoomController from "../../controller/roomController"
function ChatboxInfor(props) {
    const [userID, setUserID] = useState()
    const [roomName, setRoomName] = useState()
    const currentContext = useContext(ControleCurrenRoomContext)
    const [currenRoomID, setCurrentRoomID] =  useState()
    const [avatarURL, setAvatarURL] = useState()
    useEffect(() => {
        const callAPI = async () => {
            const user = await fetch(domain + "/info/profi",
                {
                    method: 'GET',
                    credentials: 'same-origin'
                })
                .then(res => res.json())
                .catch(err => {
                    console.log(err)
                })
            if(!user) return
            if(!currentContext.currenOpenRoomID) {
            setUserID(user.id)
            setAvatarURL(user.url)
            }
        }
        callAPI()
    }, [currentContext])
    useEffect(() => {
        const callAPI = async () => {
            const room = await fetch(domain + "/room/get-room/" + `${currentContext.currenOpenRoomID}`,
                {
                    method: 'GET',
                    credentials: 'same-origin'
                })
                .then(async res => {
                    res = await res.json()
                    return res
                })
                .then(async data => {
                    return data.room
                })
                .catch(err => {
                    console.log(err)
                })
             if(room.ChatBoxName) {
                setRoomName(room.ChatBoxName)
                setAvatarURL(null)
                return 
             }
            // const user = await room.getMembers()
            const users = await fetch(domain + "/room/room-member/" + `${currentContext.currenOpenRoomID}`,
                {
                    method: 'GET',
                    credentials: 'same-origin'
                })
                .then(async res => {
                    res = await res.json()
                    return res
                })
                .then(data => data.member)
                .catch(err => {
                    console.log(err)
                })
            if(!users) return
            for (let i = 0; i < users.length; i++) {
                if (users[i].userID !== userID) {
                    setRoomName()
                    if(!users[i].userID) return
                    const user = await UserController.getUserByID(users[i].userID)
                    setRoomName(user.userName)
                    setAvatarURL(user.avatar)
                    return
                }
            }
        }
        if(currenRoomID !== currentContext.currenOpenRoomID ) {
            setCurrentRoomID(currentContext.currenOpenRoomID)
            callAPI()
            .catch(Err => {
                console.log(Err)
            })
        }
        
    }, [currentContext])
    return (
        <div className={"chat-box-infor"}>
            {props.children}
            <Avartar url={avatarURL} />
            <h3 className={"tittle"}>{roomName}</h3>
        </div>
    )
}
export { ChatboxInfor }