/**
 * Module dependencies
 */
// react hook
import React,{useState , useContext } from 'react'
// css
import "./css/slidebar.css"
import "./css/changecontent.css"
// react component
import { UserInfor} from "./userinfor"

import { FriendChatList } from './friendchatlist'
import { TypeSlide } from './typeslide'
import { MessageBox } from './message'
import { FriendList } from './friendlist'
// context
import {ResponsesiveContext} from "./context"

/**
 * Private variable
 */
/**  storing inline properties
* if the display mode is on mobile, 
* all properties inside mobileStyle will be inline in container div of SlideBar component
*/
const mobileStyle = {
    width: "100%",
    minWidth: "300px",
    maxWidth: "900px",
    height: "calc(100%)",
    maxHeight: "1000px",
    backgroundColor: "rgb(37, 37, 37)",
    padding: "20px",
    position: "absolute",
}
// -----------------------------------------------------------
// variable for init a context to store value of a state,
// and method to controle which type of content the slide bar dispaly
// use useContext and useReducer 
// initial state
// const initialState = {
//     displayType: "relativechatbox",
//     positionComponent: {
//         relativechatbox: 2,
//         notification   : 1,
//         onlineFriend   : 1
//     }
// }
// // action
// const actions = {
//     show_relative_chatbox: "SHOW_RELATIVE_CHAT_BOX",
//     show_notification_box: "SHOW_NOTIFICATION_BOX",
//     show_onlineFriend    : "SHOW_ONLINE_FRIEND"
// }

//------------------------------------------------------------
//  ------------------COMPONENT --------------------------------------------
// Render the specifix content base the button user chosed(notification, friend, groupchat)
const ContentChange = (props) => {
    return (
        <div className = {"change-content"} style = {{overflow: "hide"}} >
            <FriendChatList {...props}/>
            <MessageBox  {...props}/>
            <FriendList {...props} />
        </div>
    )
}
// slide bar component 
const SlideBar = (props) => {
    const responsesiveContext = useContext(ResponsesiveContext)
    const [contentInside, setContenInside] = useState("chatactived");
    
    const showMessageBox = (type) => {
        setContenInside(type)
    }
    const showChatBox = (type) => {
        setContenInside(type)
    }
    return (
        // div container decide content in slide bar should be display in mobile or pc
        // using the value of ResponsiveContext.state which be passed in the chatbox component to decide wthich 
        <div style = {(responsesiveContext.state.screenType === "mobile"? mobileStyle : {})} id = {"slide-bar"}>
            <UserInfor typeSelect = {contentInside} showMessageFunc = {showMessageBox} />
            <ContentChange content = {contentInside}>
            </ContentChange>
            <TypeSlide showChatboxfunc = {showChatBox} typeSelect = {contentInside}/>
        </div>
    )
}
export {SlideBar}