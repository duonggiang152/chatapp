/**
 * module dependencies
 */
import {useState} from 'react'
import {Avartar} from "./avartar"
// css
import "./css/userinfor.css"

/**
 * Create a Notification component witch take controll when the notification come
 * @param {object} props 
 * @returns 
 */
const Notification = (props) => {
    const [click, setClick] = useState(false);
    if(props.typeSelect === "message" || props.typeSelect === "messageactived") {
        if(!click) setClick(true)
    } else {
        if(click) setClick(false)
    }
    const styleOnClick = {
        backgroundColor: "#03bafc",
    }
    const backgroundNumber = {
        backgroundColor: "black"
    }
    return (
        <div style = {(click ? styleOnClick : {})}  onClick = {
            () => {
                setClick(true);
                if(props.typeSelect !== "message" && props.typeSelect !== "messageactived") {
                    props.btnfunc("message");
                    setTimeout(() => {
                        props.btnfunc("messageactived")
                    },200)
                 }
            }}>
            <i  className = {"fas fa-user-friends"} >
                
            </i>
            <div style = {(click ? backgroundNumber : {})}>
                    <p>{props.number}</p>
            </div>
        </div>
    )
}
function UserInfor (props) {
    const [userName, setUserName] = useState("giang");
    const [friendInvite, setFriendInvite] = useState(5)
    return (
        <div>
            <Avartar url = {""} />
            <h3>{userName}</h3>
            <Notification number = {friendInvite} btnfunc = {props.showMessageFunc} {...props} />
        </div>
    )
}
export {UserInfor}