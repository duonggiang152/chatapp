/**
 * module dependencies
 */
import {useContext, useState} from 'react'
import {Avartar} from "./avartar"
// css
import "./css/userinfor.css"
// context
import { NotificationContext } from './context'
/**
 * Create a Notification component witch take controll when the notification come
 * @param {object} props 
 * @returns 
 */
const Notification = (props) => {
    const notificationValue = useContext(NotificationContext)
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
                notificationValue.clearUnreadNotification();
                notificationValue.setNotificationBoxStatus(true)
                setClick(true);
                if(props.typeSelect !== "message" && props.typeSelect !== "messageactived") {
                    props.btnfunc("message");
                    setTimeout(() => {
                        props.btnfunc("messageactived")
                    },200)
                 }
            }}>
            <i  className = {"fas fa-user-friends"} ></i>
            {   notificationValue.state.unreadNotifications.length !== 0 &&
                <div style = {(click ? backgroundNumber : {})}>
                        <p>{notificationValue.state.unreadNotifications.length}</p>
                </div>
            }
        </div>
    )
}
function UserInfor (props) {
    const notificationValue = useContext(NotificationContext)
    const [userName, setUserName] = useState("giang");
    const [friendInvite, setFriendInvite] = useState(5)
    return (
        <div>
            <Avartar url = {""} />
            <h3>{userName}</h3>
            <Notification number = {notificationValue.state.isOpenNotificationBox} btnfunc = {props.showMessageFunc} {...props} />
        </div>
    )
}
export {UserInfor}