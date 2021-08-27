import { useContext, useState } from "react"
import { SizeScreenContext } from "./context"
import "./css/chatcontent.css"

import {ChatboxInfor} from "./chatboxinfor"
import {ChatInput} from "./chatinput"
import {MessageRoomBox} from "./messageroombox"
let data = [
    {
        url: "",
        id: 123,
        message: "hello, my name is giang hello, my name is giang hello, my name is giang hello, my name is giang hello, my name is giang hello, my name is giang",
        isYou: true
    },
    {
        url: "",
        id: 123,
        message: "hello, my name is giang",
        isYou: false
    },
    {
        url: "",
        id: 123,
        message: "hello, my name is giang",
        isYou: false
    },
    {
        url: "",
        id: 123,
        message: "hello, my name is giang",
        isYou: true
    },
    {
        url: "",
        id: 123,
        message: "hello, my name is giang",
        isYou: false
    },
]
function ChatContent(props) {
   
    const [classComponent, setClassComponent] = useState("chat-content")
    const [messageRoomBoxHeight, setMessageRoomBoxHeight] = useState("100% - 70px - 10px - 5px - 41px")
    const ScreenType = useContext(SizeScreenContext);
    console.log(ScreenType)
    if(ScreenType === "pc" && classComponent !== "chat-content" ) {
        console.log(ScreenType)
        setClassComponent("chat-content")
        console.log("run1")
    }
    else if(ScreenType === "mobile" && !props.show 
            && classComponent !== "chat-content-mobile") {
                setClassComponent("chat-content-mobile")
    }
    else if(ScreenType === "mobile" && classComponent !== "chat-content-mobile"
            && classComponent !== "chat-content-mobile chat-content-mobile-active-animation"
            && classComponent !== "chat-content-mobile chat-content-mobile-showed"
            && classComponent !== "chat-content-mobile chat-content-mobile-showed chat-content-mobile-out-animation") {
        setClassComponent("chat-content-mobile");
        console.log(ScreenType)
        console.log("run2")
    }
    else if(ScreenType === "mobile" && props.show && classComponent === "chat-content-mobile"
     && classComponent !== "chat-content-mobile chat-content-mobile-active-animation"
     && classComponent !== "chat-content-mobile chat-content-mobile-showed"
     && classComponent !== "chat-content-mobile chat-content-mobile-showed chat-content-mobile-out-animation") {
        setClassComponent("chat-content-mobile chat-content-mobile-active-animation");
        setTimeout(() => {
            setClassComponent("chat-content-mobile chat-content-mobile-showed");
        }
        ,500)
    }
    const BackBtn = () => {
        if(ScreenType === "pc") return null;
        else if(ScreenType === "mobile") return (
            <i onClick = {
                () => {
                    if(ScreenType === "mobile")
                    {
                    setTimeout(
                        () => {
                            props.backbtnactive();
                        }
                        ,500)
                    setClassComponent("chat-content-mobile chat-content-mobile-showed chat-content-mobile-out-animation")
                    }
                }
            } className="fas fa-angle-right"></i>
        )
    }
    const controlmessageRoomBoxHeight = (height) => {
        setMessageRoomBoxHeight(height)
    }
    const [datatest123, setdatatest] = useState(data);
    function testsubmitbtn(value) {
        let temp =  {
            url: "",
            id: 123,
            message: value,
            isYou: true
        };
        // data.push(temp)
        setdatatest([...datatest123, temp]);
    }
    return( 
    <div style = {{overflow: "hidden"}}  className = {classComponent} id = "chat-content">
        <ChatboxInfor>
            <BackBtn/>
        </ChatboxInfor>
        <MessageRoomBox height = {messageRoomBoxHeight} data_in = {datatest123}/>
        <ChatInput on_Resize = {controlmessageRoomBoxHeight} submitbtnfuc = {testsubmitbtn} />
        
    </div>
    )

}


export {ChatContent}