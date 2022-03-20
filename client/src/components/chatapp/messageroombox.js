import { useState, useEffect, useRef } from "react"

import "./css/messageroombox.css"
import "./css/textmessage.css"

import {Avartar} from "./avartar"

function TextMessage(props) {
    let _class_private = "";
    if(props.isYou) {
        _class_private = "message-chat message-right"
        return (
            <div style = {{width: "100%", overflow: "hidden"}} className = {_class_private}>
                <div>
                    {props.message}
                </div>
            </div>
            )
    }
    else {
        _class_private = "message-chat message-left"
        return (
            <div className = {_class_private}>
                <Avartar small {...props} />
                <p>
                   {props.message}
                </p>
            </div>
            )
    }
}

function MessageRoomBox (props) {
    // console.log(props.data_in)
    // const [data, setData] = useState(props.data_in);
    // useEffect(() => {
    //     setData(props.data_in)
    // }, [props])
    const texmessagebox = useRef(null);
    useEffect(() => {
            texmessagebox.current.scrollTop = texmessagebox.current.scrollHeight; 
    },[])
    return (
        <div ref = {texmessagebox} className = {"message-room-box"} style = {{height: `calc(${props.height})`}}>
           {
               props.data_in.map(Element => {
                   return <TextMessage {...Element} />
               })
           }
        </div>
    )
}
export {MessageRoomBox}