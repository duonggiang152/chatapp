import { useRef, useState } from "react";
import "./css/chatinput.css"
// default properties of chatboxinput
const m_style = {
    resize: "none",
}
function ChatInput(props) {
    const boxChat = useRef(null)
    const [chatcontent, setChatcontent] = useState("");
    function processSubmit() {
        boxChat.current.value = ""
        setChatcontent("")
        if(chatcontent !== "")
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
                <textarea onFocus={() => {
                    props.setInputFocus(true)
                }} onBlur = {() => {
                    props.setInputFocus(false)
                }} ref={boxChat} onKeyPress = {(e) => press(e)} onSubmit = {(e) => {e.preventDefault()}} name = "chatcontent" onChange = {(e) => {
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
                    <i className="fas fa-share"></i>
                </button>
            </div>
        </div>
    )
}
export {ChatInput}