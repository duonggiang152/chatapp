import { useContext, useEffect, useState } from "react";
import {SlideBar} from "./slidebar";
import {ChatContent} from "./chatcontent"
import {SizeScreenContext, ActiveChatContentMobileVersion} from "./context"
function ChatApp() {
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
       window.addEventListener('resize', checkType)
    })
    const controlMobileScreenChatContentfunc = () => {
          setShowChatContentMobileVersion(true);
    }
    const activeSlideBar = () => {
        setShowChatContentMobileVersion(false);
    }
    return (
        <div style = {{overflow: "hidden", display: "flex", width: "100%"}}>
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