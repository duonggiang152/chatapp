import React, { useState, useContext, useEffect } from 'react'
import "./css/friendchatlist.css"
import { Avartar } from './avartar'
import { ResponsesiveContext, ChatContext, ControleCurrenRoomContext, NewMessageContext } from './context'
import { SearchBox } from './searchbox'
import domain from '../../config/domain'
import socketIO from '../../controller/socketIO'
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
    const [roomdetail, setRoomdetail] = useState([])
    // for access responsiveContext
    const responsesiveContext = useContext(ResponsesiveContext)
    const controleCurrenRoom  = useContext(ControleCurrenRoomContext)
    const newMEssageContext = useContext(NewMessageContext)

    useEffect(() => {
        const setup = async () => {
            fetch(domain + "/room/room-member/" + `${props.cbID}`,
                {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(async res => {
                    if (res.status !== 200) return
                    res = await res.json()
                    const data = await Promise.all(res.member.map((async member => {
                        return await fetch(domain + "/info/" + `${member.userID}`,
                            {
                                method: 'GET',
                                credentials: 'same-origin',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(async (res) => {
                                if (res.status !== 200) return
                                res = await res.json()
                                return res
                            })
                            .catch(err => {
                                return null
                            })
                    })))
                    const lastmessage = await fetch(domain + "/message/get-message/?" + `cbid=${props.cbID}&limit=1`,
                        {
                            method: 'GET',
                            credentials: 'same-origin',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                        .then(async (res) => {
                            if (res.status !== 200) return
                            res = await res.json()
                            if(res.message){
                                const [_, yyyy, mm, dd, hh, min, ss] = res.message[0].datetime.match(/(\d{4})-(\d{2})\-(\d{2}) (\d{2}):(\d{2}):(\d{2})/);
				                const date1 = new Date(yyyy, mm - 1, dd, hh, min, ss)
                                const date2 = new Date()
                                let result = ""
                                if(date1.getFullYear() !== date2.getFullYear()) result = date1.getFullYear()
                                else if(date1.getMonth() !== date2.getMonth()) result = date1.getMonth()
                                else if(date1.getDay() !== date2.getDay()) result = date1.getDay()
                                else result = date1.getHours + ":"+ date1.getMinutes + ":"+date1.getSeconds()
                            }
                            return res.message[0]
                        })
                        .catch(err => {
                            return null
                        })
                    setRoomdetail({
                        cbID: props.cbID,
                        members: data,
                        lastmessage: lastmessage
                    })

                })
                .catch(err => {
                    console.log(err)
                })
        }
        setup()
    }, [newMEssageContext])
    let profiID = props.profi.id
   
    if (profiID)
        return (
            <article  onClick={
                () => {
                    controleCurrenRoom.setCurrenOpenRoomID(props.cbID)
                    if (responsesiveContext.state.screenType === "mobile") {
                        responsesiveContext.setMobileModeOnChatbox()
                       
                    }
                }
            }>
                <Avartar small url={props.urlavatar} />
                <div className={"tittle-contentchat"}>
                    {roomdetail && roomdetail.members && roomdetail.members.length >= 2 && profiID ?
                        <h3 className={"tittle"}>{roomdetail.members[0].id === profiID ? roomdetail.members[1].userName : roomdetail.members[0].userName}</h3> : ""
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
    useEffect(async () => {
        // update userID
        await fetch(domain + "/info/profi",
            {
                method: 'GET',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async res => {
                if (res.status !== 200) {
                    setProfi({})
                }
                res = await res.json()
                setProfi(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div style={styleComponentInline} className={animationactive}>
            <SearchBox />
            {profi && profi.id ?
                chatContext.state.roomsInfo.map(data => {
                    return <FriendChat {...data} profi={profi} />
                }) : ""
            }

        </div>
    )
}
export { FriendChatList }