import React, { useState, useContext, useEffect } from 'react'
import "./css/friendchatlist.css"
import { Avartar } from './avartar'
import { ResponsesiveContext, ChatContext, ControleCurrenRoomContext, NewMessageContext } from './context'
import UserController from '../../controller/userController'
import RoomController from '../../controller/roomController'
const Content_Style = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden"
}
let ownStyle_friendchatlist = {

}
function FriendChat(props) {
    /**room detail
     * {
     * cbID
     *  members: [{
     *      id:
     *      name:
     *      avatar
     * }]
     * }
     */
    console.log("run")
    const [roomdetail, setRoomdetail] = useState({name: "LOADING"})

    // for access responsiveContext
    const responsesiveContext = useContext(ResponsesiveContext)
    const controleCurrenRoom = useContext(ControleCurrenRoomContext)
    const newMEssageContext = useContext(NewMessageContext)
    const [data, setData] = useState([])
    useEffect(() => {
        const setup = async () => {
            RoomController.getRoomByID(props.cbID)
                .then(async room => {
                    const members = await room.getMembers()
                    const data = await Promise.all(members.map((async member => {
                        return await UserController.getUserByID(member.userID)
                    })))
                    // console.log(data)
                    setData(data)
                    let lastMessage = await room.getMessage(undefined, 1)
                    if(lastMessage && lastMessage.length !== 0) {
                        lastMessage = lastMessage[0]
                        const user = await UserController.getUserByID(lastMessage.userID)
                        const userName = await user.getUserName()
                        lastMessage.userName = userName
                    }
                    // console.log(lastMessage[0])
                    // if(res.message){
                    //     const [_, yyyy, mm, dd, hh, min, ss] = res.message[0].datetime.match(/(\d{4})-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
                    //     const date1 = new Date(yyyy, mm - 1, dd, hh, min, ss)
                    //     const date2 = new Date()
                    //     let result = ""
                    //     if(date1.getFullYear() !== date2.getFullYear()) result = date1.getFullYear()
                    //     else if(date1.getMonth() !== date2.getMonth()) result = date1.getMonth()
                    //     else if(date1.getDay() !== date2.getDay()) result = date1.getDay()
                    //     else result = date1.getHours + ":"+ date1.getMinutes + ":"+date1.getSeconds()
                    // }
                    // return res.message[0]
                    setRoomdetail({
                        name: room.name,
                        cbID: props.cbID,
                        members: data,
                        lastmessage: lastMessage
                    })

                })
                .catch(err => {
                    console.log(err)
                })
        }
        setup()
    }, [newMEssageContext])
    let user = {}
    let profiID = props.profi.id
    try {
        user = data[0].userID === profiID ? data[1] : data[0]

    }
    catch (err) {

    }
    let nameBox = ""
    console.log(roomdetail)
    if(!roomdetail.name)
        nameBox = data[0].userID === profiID ? data[1].userName : data[0].userName
    else 
        nameBox = roomdetail.name
    // console.log(profiID)
    if (data.length === 0) return null
    if (profiID)
        return (
            <article onClick={
                () => {
                    controleCurrenRoom.setCurrenOpenRoomID(props.cbID)
                    if (responsesiveContext.state.screenType === "mobile") {
                        responsesiveContext.setMobileModeOnChatbox()

                    }
                }
            } tabIndex>
                <Avartar small url={user.avatar} />
                <div className={"tittle-contentchat"}>
                    {roomdetail && roomdetail.members && roomdetail.members.length >= 2 && profiID ?
                        <h3 className={"tittle"}>{nameBox}</h3> : ""
                    }
                    {
                        roomdetail && roomdetail.lastmessage ?
                            <div className={"contentchat"}>
                                <p>{roomdetail.lastmessage.userName}</p>
                                <p style={Content_Style}>{roomdetail.lastmessage.message}</p>
                                <p>{roomdetail.lastmessage.datetime}</p>
                            </div> : ""

                    }

                </div>
            </article>
        )
}
function FriendChatList(props) {
    const [styleComponentInline, setStyleComponentInline] = useState(ownStyle_friendchatlist);
    const [profi, setProfi] = useState()
    const chatContext = useContext(ChatContext)
    let animationactive = "friend-chat-list";
    if (props.content === "chat") {
        animationactive = "friend-chat-list active";
    }
    else if (props.content === "chatactived"
        && styleComponentInline.zIndex !== "1") {
        ownStyle_friendchatlist = {
            zIndex: "1",
        }
        setStyleComponentInline(ownStyle_friendchatlist)
    }
    else if (props.content !== "chat"
        && props.content !== "chatactived"
        && ownStyle_friendchatlist.zIndex === "1") {
        setTimeout(
            () => {
                ownStyle_friendchatlist = {
                };
                setStyleComponentInline(ownStyle_friendchatlist);
            }, 150)
    }
    useEffect( () => {
        const callAPI = async () => {
            // update userID
            let user = await UserController.getLoginUser()
            if (!user) user = {}
            setProfi(user)
        }
        callAPI()

    }, [])
    return (
        <div style={styleComponentInline} className={animationactive}>
            {profi && profi.id ?
                chatContext.state.roomsInfo.map(data => {
                    return <FriendChat {...data} profi={profi} />
                }) : ""
            }

        </div>
    )
}
export { FriendChatList }