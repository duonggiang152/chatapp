import { useState, useEffect } from "react";
import "./css/message.css"
import "./css/friendinvite.css"



import {SearchBox} from "./searchbox"


let ownStyle_message = {

}


// const 

let test = [
    {
        id: 123,
        userFriend: "giang",
        type: "friendinvite",
    },
    {
        id: 123,
        userFriend: "giang",
        type: "friendinvite",
    },
    {
        id: 123,
        userFriend: "giang",
        type: "friendinvite",
    },
    {
        id: 123,
        userFriend: "giang",
        type: "friendinvite",
    },
    {
        id: 123,
        userFriend: "giang",
        type: "friendinvite",
    },
]

function FriendInvite(props) {
    return <div className = "friend-invite">
        <p>Nhận được 1 lời kết bạn từ {props.userFriend}</p>
        <div>
        <i class="fas fa-check"></i>
        <i class="fas fa-times"></i>
        </div>
    </div>
}

function Message() {
    return (
        <>
            {
                test.map(element => {
                    return <FriendInvite {...element} />
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