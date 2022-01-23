import {useState} from 'react'
import "./css/friendlist.css";

import {Avartar} from "./avartar"
let ownStyle_friendlist = {

}
function Friend(props) {
    if(!props.online) {
        return (
            <div className = {"friend"}>
                <Avartar small url = {`${props.friendurl}`} />
                <h3>{props.username}</h3>
                <i class="notonline fas fa-circle"></i>
            </div>
        )
    }
    else {
        return (
            <div className = {"friend"}>
                <Avartar small url = {`${props.friendurl}`} />
                <h3>{props.username}</h3>
                <i class="online fas fa-circle"></i>
            </div>
        )
    }
}
let data = [
    {
        friendurl: "",
        username: "giang",
        online: false, 
    },
    {
        friendurl: "",
        username: "giang",
        online: true, 
    },
    {
        friendurl: "",
        username: "giang",
        online: false, 
    },
    {
        friendurl: "",
        username: "giang",
        online: true, 
    },
]
function FriendList(props) {
    const [styleComponentInline, setStyleComponentInline] = useState(ownStyle_friendlist);
    // console.log(styleComponentInline.zIndex)
    let animationactive = "friendlist";
    if(props.content === "friendlist") {
        animationactive = "friendlist active"
    }
    else if(props.content === "friendlistactived" 
    && styleComponentInline.zIndex !== "1") {
        ownStyle_friendlist = {
            zIndex: "1",
            top: "0%"
        }
        setStyleComponentInline(ownStyle_friendlist)
    }
    else if(props.content !== "friendlist" 
    && props.content !== "friendlistactived"
    && ownStyle_friendlist.zIndex === "1") {
        setTimeout(
            () => {
                ownStyle_friendlist = {
                };
                setStyleComponentInline({});
            }, 150)
    }
    return (
        <div style = {styleComponentInline} className = {animationactive}>
           {data.map(element => {
               return <Friend {...element} />
           })}
        </div>
    )
}
export {FriendList}