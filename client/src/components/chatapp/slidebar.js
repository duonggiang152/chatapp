import React,{useState , useContext } from 'react'

import "./css/slidebar.css"
import "./css/changecontent.css"

import {UserInfor} from "./userinfor"
import { SearchBox } from './searchbox'
import { FriendChatList } from './friendchatlist'
import { TypeSlide } from './typeslide'
import {SizeScreenContext} from "./context"
import { MessageBox } from './message'
import { FriendList } from './friendlist'
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
const SlideBar = (props) => {
    const TypeScreen = useContext(SizeScreenContext);
    const [contentInside, setContenInside] = useState("chatactived");
    function ContenChange(props) {
        return (
            <div className = {"change-content"} style = {{overflow: "hide"}} >
                <FriendChatList {...props}/>
                <MessageBox  {...props}/>
                <FriendList {...props} />
            </div>
        )
    }
    const showMessageBox = (type) => {
        setContenInside(type)
    }
    const showChatBox = (type) => {
        setContenInside(type)
    }
    return (
        <div style = {(TypeScreen === "mobile"? mobileStyle : {})} id = {"slide-bar"}>
            <UserInfor typeSelect = {contentInside} showMessageFunc = {showMessageBox} />
            <ContenChange content = {contentInside}>
            <SearchBox />
            </ContenChange>
            <TypeSlide showChatboxfunc = {showChatBox} typeSelect = {contentInside}/>
        </div>
    )
}
export {SlideBar}