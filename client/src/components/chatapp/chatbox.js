import { useContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import {SlideBar} from "./slidebar";
import {ChatContent} from "./chatcontent"
import domain from "../../config/domain";

import {SizeScreenContext, ActiveChatContentMobileVersion} from "./context"
import socketIO from "../../controller/socketIO";
function ChatApp() {
    
    const history = useHistory()
    //checking if page was authentication
    fetch(domain + "/isauth/",
        {
           method: 'GET',
           credentials: 'same-origin',
           headers : {
               'Content-Type': 'application/json'
           },
           
        })
    .then(async response => {
        if(response.status === 200) {
            return
        }
        else {
            history.push("/login")
            return
        }
    })
    .catch(err => {
        console.log(err)
    })
    const TypeScreen = useContext(SizeScreenContext);
    const [screenType, setScreenType] = useState("pc");
    const [showChatContentMobileVersion, setShowChatContentMobileVersion] = useState(false);
    const checkType = () => {
        if((window.innerWidth >= 610)
            && screenType !== "pc") setScreenType("pc")
        else if((window.innerWidth < 610 )
            && screenType !== "mobile") setScreenType("mobile");
    }
    checkType();
    useEffect(() => {
        socketIO.connect()
        window.addEventListener('resize', checkType)
    })
    const controlMobileScreenChatContentfunc = () => {
          setShowChatContentMobileVersion(true);
    }
    const activeSlideBar = () => {
        setShowChatContentMobileVersion(false);
    }
    return (
        <div id="chatapp" style = {{overflow: "hidden", display: "flex", width: "100%"}}>
        <SizeScreenContext.Provider value = {screenType} >
            <ActiveChatContentMobileVersion.Provider value = {controlMobileScreenChatContentfunc}>
                <SlideBar/>
            </ActiveChatContentMobileVersion.Provider>
            <ChatContent show = {showChatContentMobileVersion} backbtnactive = {activeSlideBar}/>
        </SizeScreenContext.Provider>
        </div>
    )
}
export {ChatApp}