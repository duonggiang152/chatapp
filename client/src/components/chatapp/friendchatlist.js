import React,{useState, useContext} from 'react'
import "./css/friendchatlist.css"
import { Avartar } from './avartar'
import {ResponsesiveContext } from './context'
import { SearchBox } from './searchbox'
const test = [
    {
        id : 1213123,
        urlavatar: "",
        tittle: "Hello Giang",
        online : true,
        lastmessage : {
            id: 121121,
            user: "Yasua",
            content: "hello giangsddsdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddffffffffffff",
            date : "10h30 PM"
        }
    }
]
const Content_Style = {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow : "hidden"
}
let ownStyle_friendchatlist = {
    
}
function FriendChat(props) {
    // for access responsiveContext
    const responsesiveContext = useContext(ResponsesiveContext)
    return (
        <article key = {props.id} onClick = {
            () => {
                if(responsesiveContext.state.screenType === "mobile")
                responsesiveContext.setMobileModeOnChatbox()
            }
        }>
            <Avartar small url = {props.urlavatar} />
            <div className = {"tittle-contemtchat"}>
                <h3 className = {"tittle"}>{props.tittle}</h3>
                <div className = {"contentchat"}>
                    <p>{props.lastmessage.user +":"}</p>
                    <p style = {Content_Style}>{props.lastmessage.content}</p>
                    <p>{props.lastmessage.date}</p>
                </div>
            </div>
        </article>
    )
}
function FriendChatList (props) {
    const [chatListInfo, setChatListInfo] = useState(test)
    const [styleComponentInline, setStyleComponentInline] = useState(ownStyle_friendchatlist);
    let typeComponent = {}
    let animationactive = "friend-chat-list";
    if (props.content === "chat"  ) {
        animationactive = "friend-chat-list active";
    }
    else if(props.content ==="chatactived"
    && styleComponentInline.zIndex !== "1") {
        ownStyle_friendchatlist = {
            zIndex: "1",
        }
       setStyleComponentInline(ownStyle_friendchatlist)
    }
    else if(    props.content !== "message"
    &&  props.content !== "messageactived"
    &&  ownStyle_friendchatlist.zIndex === "1") {
        setTimeout(
            () => {
                ownStyle_friendchatlist = {
                };
                setStyleComponentInline(ownStyle_friendchatlist);
            }, 150)
    }
    return (
        <div style = {styleComponentInline} className = {animationactive}>
            <SearchBox />
            {
                chatListInfo.map(data => {
                    return <FriendChat {...data} />
                })
            }
        </div>
    )
}
export {FriendChatList}