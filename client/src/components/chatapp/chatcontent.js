/**
 * module dependencies
 */
import { useContext, useEffect, useState } from "react"
import { ResponsesiveContext, ControleCurrenRoomContext, ChatContext } from "./context"
import { ChatboxInfor } from "./chatboxinfor"
import { ChatInput } from "./chatinput"
import { MessageRoomBox } from "./messageroombox"
import domain from "../../config/domain"
// css
import "./css/chatcontent.css"
import  Room  from "../../controller/roomController"
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
    const [showChatContent, setShowChatContent] = useState(false) 
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
    const responsiveContext = useContext(ResponsesiveContext)
    const currentRoom = useContext(ControleCurrenRoomContext)
    const chatContext = useContext(ChatContext)
    const [messageRoomBoxHeight, setMessageRoomBoxHeight] = useState("100% - 70px - 10px - 5px - 41px")
    const [userID, setUserID] = useState();
    // update display type by changing classComponent state when screen type change
    const updateDisplayStyle = () => {
        // pc type
        if (responsiveContext.state.screenType === "pc") {
            setShowChatContent(false)
            setClassComponent("chat-content")
            return
        }
        // mobile type and the chatcontent will hide
        else if (responsiveContext.state.screenType === "mobile" &&
            responsiveContext.state.mobileProperties.slideBar === true) {
                setShowChatContent(false)
                setClassComponent("chat-content-mobile")
            return
        }
        // mobile type and the chatcontent will show
        else if (responsiveContext.state.screenType === "mobile" &&
            responsiveContext.state.mobileProperties.content === true && showChatContent === false) {
            setClassComponent("chat-content-mobile chat-content-mobile-active-animation")
            setTimeout(() => {
                setShowChatContent(true)
                setClassComponent("chat-content-mobile chat-content-mobile-showed");
            }
                , 500)
            return
        }
    }
    useEffect(() => {
        updateDisplayStyle()
    }, [responsiveContext, showChatContent])
    useEffect(() => {
        const callAPI = async () => {
            const userID = await fetch(domain + "/info/profi",
                {
                    method: 'GET',
                    credentials: 'same-origin',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(async res => {
                    if (res.status !== 200) return
                    res = await res.json()
                    return res.id
                })
                .catch(err => {
                    console.log(err)
                    return null
                })
            setUserID(userID)
        }
        callAPI()
    }, [])
    const BackBtn = () => {
        return (
            <i onClick={
                () => {
                    if (responsiveContext.state.screenType === "mobile") {
                        setShowChatContent(false)
                        setClassComponent("chat-content-mobile chat-content-mobile-showed chat-content-mobile-out-animation")
                        responsiveContext.setMobileModeOnSlideBar()
                    }
                }
            } className="fas fa-angle-right" style={{cursor: "pointer"}}></i>
        )
    }
    const controlmessageRoomBoxHeight = (height) => {
        setMessageRoomBoxHeight(height)
    }
    const [messageData, setMessageData] = useState(data);
    function testsubmitbtn(value) {

        let temp = {
            url: "",
            id: userID,
            message: value,
            isYou: true
        };
        setMessageData([...messageData, temp]);
    }

    return (
        <div style={{ overflow: "hidden" }} className={classComponent} id="chat-content">
            <ChatboxInfor userID = {userID} trgger = {currentRoom}>
                {responsiveContext.state && responsiveContext.state.screenType === "mobile" ? <BackBtn /> : ""}
            </ChatboxInfor>
            <MessageRoomBox height={messageRoomBoxHeight} data_in={messageData} />
            <ChatInput on_Resize={controlmessageRoomBoxHeight} submitbtnfuc={testsubmitbtn} />

        </div>
    )

}


export { ChatContent }