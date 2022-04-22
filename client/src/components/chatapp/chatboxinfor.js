import { useContext, useEffect, useState } from "react"
import { Avartar } from "./avartar"
import { ChatContext, ControleCurrenRoomContext } from "./context"
import domain from "../../config/domain"
import "./css/chatboxinfor.css"
const testdata = {
    url: "",
    tittle: "Test   tittle",
    online: false,
}
function ChatboxInfor(props) {
    const [userID, setUserID] = useState()
    const [roomName, setRoomName] = useState()
    const chatContext = useContext(ChatContext)
    const currentContext = useContext(ControleCurrenRoomContext)
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
                    return
                }
            }
        }
        callAPI()
    }, [props])
    let data = testdata
    return (
        <div className={"chat-box-infor"}>
            {props.children}
            <Avartar url={data.url} />
            <h3 className={"tittle"}>{roomName}</h3>
        </div>
    )
}
export { ChatboxInfor }