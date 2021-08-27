import { useState } from "react";
import "./css/chatinput.css"
const m_style = {
 
    resize: "none",
    // overflow: "hidden"
}
function ChatInput(props) {
    const [chatcontent, setChatcontent] = useState("");
    function processSubmit() {
        props.submitbtnfuc(chatcontent);
    }
    function press(e) {
        if(e.charCode == 13 && !e.shiftKey) {
            e.preventDefault();
            if(e.target.value !== "")
            props.submitbtnfuc(e.target.value);
            e.target.value = "";
            return true;
        }
    }
    return (
        <div   className = {"chat-input"} id = "chat-content-input">
            <div>
                <textarea onKeyPress = {(e) => press(e)} onSubmit = {(e) => {e.preventDefault()}} name = "chatcontent" onChange = {(e) => {
                    setChatcontent(e.target.value);
                    e.target.style.height = "auto";
                    let temp = e.target.scrollHeight;
                    if(temp > 100) {
                        e.target.style.height = "100px"
                        props.on_Resize("100% - 70px - 10px - 5px - 100px")
                    }
                    else {
                        e.target.style.height = `${temp}px`
                        props.on_Resize(`100% - 70px - 10px - 5px - ${temp}px`)
                    }
                    console.log(e.target.style.height)
                }} style = {m_style} ></textarea>
                <button onClick = {processSubmit}>
                    <i class="fas fa-share"></i>
                </button>
            </div>
        </div>
    )
}
export {ChatInput}