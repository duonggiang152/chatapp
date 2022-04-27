import { useContext, useEffect, useState } from "react"
import { Avartar } from "./avartar"
import { ControleCurrenRoomContext } from "./context"
import domain from "../../config/domain"
import "./css/chatboxinfor.css"
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
            setUserID(user.id)
            setAvatarURL(user.url)
        }
        callAPI()
    }, [])
    useEffect(() => {
        const callAPI = async () => {
            const users = await fetch(domain + "/room/room-member/" + `${currentContext.currenOpenRoomID}`,
                {
                    method: 'GET',
                    credentials: 'same-origin'
                })
                .then(res => res.json())
                .then(data => data.member)
                .catch(err => {
                    console.log(err)
                })
            if(!users) return
            for (let i = 0; i < users.length; i++) {
                if (users[i].userID !== userID) {
                    setRoomName()
                    if(!users[i].userID) return
                    const user = await fetch(domain + "/info/" + `${users[i].userID}`,
                        {
                            method: 'GET',
                            credentials: 'same-origin'
                        })
                        .then(res => res.json())
                        .catch(err => {
                            console.log(err)
                        })
                    setRoomName(user.userName)
                    console.log(user)
                    setAvatarURL(user.avatar)
                    return
                }
            }
        }
        if(currenRoomID !== currentContext.currenOpenRoomID ) {
            setCurrentRoomID(currentContext.currenOpenRoomID)
            callAPI()
        }
        
    }, [props])
    return (
        <div className={"chat-box-infor"}>
            {props.children}
            <Avartar url={avatarURL} />
            <h3 className={"tittle"}>{roomName}</h3>
        </div>
    )
}
export { ChatboxInfor }