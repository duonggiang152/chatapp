import React,{useState, useContext} from 'react'
import "./css/friendchatlist.css"
import { Avartar } from './avartar'
import { ActiveChatContentMobileVersion } from './context'
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
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
    },
]
const Content_Style = {
     whiteSpace: "nowrap",
      textOverflow: "ellipsis",
       overflow : "hidden"
}
let ownStyle_friendchatlist = {
    
}
function FriendChat(props) {
    const showchatboxcontentfunc = useContext(ActiveChatContentMobileVersion);
    return (
        <article key = {props.id} onClick = {
            () => {
                showchatboxcontentfunc();
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
            top: "0%"
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
            {props.children}
            {
                chatListInfo.map(data => {
                    return <FriendChat {...data} />
                })
            }
        </div>
    )
}
export {FriendChatList}