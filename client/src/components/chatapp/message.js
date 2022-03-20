import { useState, useEffect, useContext } from "react";
import "./css/message.css"
import "./css/friendinvite.css"

import {SearchBox} from "./searchbox"
import {NotificationContext} from "./context"
import domain from "../../config/domain";
let ownStyle_message = {

}


// const 

// let test = [
//     {
//         id: 123,
//         userFriend: "giang",
//         type: "friendinvite",
//     },
//     {
//         id: 123,
//         userFriend: "giang",
//         type: "friendinvite",
//     },
//     {
//         id: 123,
//         userFriend: "giang",
//         type: "friendinvite",
//     },
//     {
//         id: 123,
//         userFriend: "giang",
//         type: "friendinvite",
//     },
//     {
//         id: 123,
//         userFriend: "giang",
//         type: "friendinvite",
//     },
// ]

function FriendInvite(props) {
    const [data, setData] = useState();
    const [style, setStyle] = useState("fas fa-check notsend")
    useEffect(async () => 
        {
            await fetch(domain + "/info/" + `${props.userIDSend}`,
            {
            method: 'GET',
            credentials: 'same-origin',
            headers : {
                'Content-Type': 'application/json'
            }
            })
            .then(res=> res.json())
            .then(async data => {
                console.log(props)
                setData(data)
                await fetch(domain + "/isacceptfriendrequest/" + `${props.ntfID}`,
                {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers : {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res=>res.json())
                .then(data => {
                    console.log("------------------------------")
                    console.log(data)
                    if(data.isAccepted) setStyle("fas fa-check notsent")
                })
            })
            .catch(err => {
                setData(null)
            })
            
        }
    , [props])
    const acceptFriendRequest =async () => {
        if(style === "fas fa-check notsent" ) return
        const body = {
            'ntfID': props.ntfID
        }
        await fetch(domain + "/acceptfriendrequest",
        {
        method: 'POST',
        credentials: 'same-origin',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
        })
        .then(async res => {
            if(res.status !== 200) return
            else {
                setStyle('fas fa-check notsent')
                return 
            }
        })
        .catch(err => {

        })
    }
    if(!data) {
        return (null)
    }
    return <div className = "friend-invite">
        <p>Nhận được 1 lời kết bạn từ {data.userName}</p>
        <div>
        <i onClick={() => {
            acceptFriendRequest()
        }} class={style}></i>
        </div>
    </div>
}
function AcceptFriendRequest(props) {
    const [data, setData] = useState();
    useEffect(async () => 
        {
            await fetch(domain + "/info/" + `${props.userIDSend}`,
            {
            method: 'GET',
            credentials: 'same-origin',
            headers : {
                'Content-Type': 'application/json'
            }
            })
            .then(res=> res.json())
            .then(data => {
                setData(data)
            })
            .catch(err => {
                setData(null)
            })
        }
    , [props])
    if(!data) {
        return (null)
    }
    return <div className = "friend-invite">
        <p>{data.userName} đã chấp nhận lời mời kết bạn của bạn</p>
    </div>
}
function Message() {
    const notificationContext = useContext(NotificationContext)
    const data = notificationContext.state.Notifications
    return (
        <>
            {
                data.map(element => {
                    if(element.type === 0)
                    return <FriendInvite {...element} />
                    else if(element.type === 1) {
                    return <AcceptFriendRequest {...element} />    
                    }
                    else {
                        return(null)
                    }
                })
            }
        </>
    )
}

function MessageBox(props) {
    const [styleComponentInline, setStyleComponentInline] = useState(ownStyle_message);
    let animationactive = "message";
    if(props.content === "message") {
        animationactive = "message active"
    }
    else if(props.content === "messageactived"
    && styleComponentInline.zIndex !== "1") {
        ownStyle_message = {
            zIndex: "1",
        }
        setStyleComponentInline(ownStyle_message)
    }
    else if(    props.content !== "message"
            &&  props.content !== "messageactived"
            &&  ownStyle_message.zIndex === "1") {
                setTimeout(
                    () => {
                        ownStyle_message = {
                        };
                        setStyleComponentInline(ownStyle_message);
                    }, 150)
    }
    // setup socketIO listener to get new message
    return (
    <div style= {styleComponentInline}  className = {animationactive}>
       <SearchBox placeholder = {"Tìm Kiếm"}/>
        <Message />
    </div>
    )
}
export { MessageBox }