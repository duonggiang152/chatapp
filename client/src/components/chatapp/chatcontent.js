/**
 * module dependencies
 */
import { useContext, useEffect, useState } from "react"
import { ResponsesiveContext } from "./context"
import {ChatboxInfor} from "./chatboxinfor"
import {ChatInput} from "./chatinput"
import {MessageRoomBox} from "./messageroombox"
// css
import "./css/chatcontent.css"
// data for test
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
    }
]

/**
 * generate a CHATBOX
 * @param {object} props 
 * @returns 
 */
function ChatContent(props) {
    /**
     * classComponent for store classname of container box in this container
     * changing value mean changing display type
     * value:
     * 
     * "chat-content"  : display chat box in pc mode
     * 
     * "chat-content- mobile" : display chatbox in mobile mode (default is hidding below the slidebar)
     * 
     * "chat-content-mobile chat-content-mobile-active-animation" : for active animation when chat box show up
     * 
     * "chat-content-mobile chat-content-mobile-showed"           : for show the content in mobile form
     * 
     * "chat-content-mobile chat-content-mobile-showed chat-content-mobile-out-animation" : for runing hidding animation chat box in screenType mobile
     * 
     */
    const [classComponent, setClassComponent] = useState("chat-content")
    const responsiveContext                   = useContext(ResponsesiveContext)
    const [messageRoomBoxHeight, setMessageRoomBoxHeight] = useState("100% - 70px - 10px - 5px - 41px")
    // update display type by changing classComponent state when screen type change
    const updateDisplayStyle = () => {
        // pc type
        if(responsiveContext.state.screenType === "pc") {
            setClassComponent("chat-content")
            return
        }
        // mobile type and the chatcontent will hide
        else if(responsiveContext.state.screenType === "mobile" &&
                responsiveContext.state.mobileProperties.slideBar === true) {
                    setClassComponent("chat-content-mobile")
                    return
                }
        // mobile type and the chatcontent will show
        else if(responsiveContext.state.screenType === "mobile" &&
                responsiveContext.state.mobileProperties.content === true) {
                    setClassComponent("chat-content-mobile chat-content-mobile-active-animation")
                    setTimeout(() => {
                        setClassComponent("chat-content-mobile chat-content-mobile-showed");
                    }
                    ,500)
                    return
                }
    }
    useEffect(() => {
        console.log("hi")
        updateDisplayStyle()
    }, [responsiveContext])
    const BackBtn = () => {
        return(    
        <i onClick = {
                () => {
                    if(responsiveContext.state.screenType === "mobile")
                    {
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
        setdatatest([...datatest123, temp]);
    }
    return( 
    <div style = {{overflow: "hidden"}}  className = {classComponent} id = "chat-content">
        <ChatboxInfor>
            {responsiveContext.state && responsiveContext.state.screenType === "mobile" ? <BackBtn/> : ""}
        </ChatboxInfor>
        <MessageRoomBox height = {messageRoomBoxHeight} data_in = {datatest123}/>
        <ChatInput on_Resize = {controlmessageRoomBoxHeight} submitbtnfuc = {testsubmitbtn} />
        
    </div>
    )

}


export {ChatContent}