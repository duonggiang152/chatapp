import {useState} from 'react'
import "./css/typeslide.css"

function TypeSlide(props) {
    const [type, setType] = useState("chat");
    const [click, setClick] = useState(0);
    if(props.typeSelect === "message") {
        if(click !== -1) setClick(-1);
    }
    const clickChat = () => {
        setClick(0)
    }
    const clickFriend = () => {
        setClick(1)
    }
    return (
        <div id = {"type-slide"}>
            <div>
                <h3 className = {(click === 0 ? "active" : "" )} style = {{textAlign: "center"}}
                onClick = {() => {
                    if(props.typeSelect !== "chat" && props.typeSelect !== "chatactived") {
                        props.showChatboxfunc("chat");
                        setTimeout(() => {
                            props.showChatboxfunc("chatactived");
                        },200)
                        clickChat(0);
                    }
                }}>Chat</h3>
            </div>
            <div>
                <h3 className = {(click === 1 ? "active" : "" )} style = {{textAlign: "center"}}
                onClick = {() => {
                    if(props.typeSelect !== "friendlist" && props.typeSelect !== "friendlistactived") {
                        props.showChatboxfunc("friendlist");
                        setTimeout(() => {
                            props.showChatboxfunc("friendlistactived");
                        },200)
                    }
                    clickFriend();
                }}>Friend</h3>
            </div>
        </div>
    )
}
export {TypeSlide}