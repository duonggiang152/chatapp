/**
 * module dependencies
 */
import { useContext, useEffect, useRef, useState } from 'react'
import { Avartar } from "./avartar"
// css
import "./css/userinfor.css"
// context
import { DialogContext, NotificationContext } from './context'
import { useHistory } from 'react-router-dom'
import domain from '../../config/domain'
/**
 * Create a Notification component witch take controll when the notification come
 * @param {object} props 
 * @returns 
 */
const Notification = (props) => {
    const notificationValue = useContext(NotificationContext)
    const [click, setClick] = useState(false);
    if (props.typeSelect === "message" || props.typeSelect === "messageactived") {
        if (!click) setClick(true)
    } else {
        if (click) setClick(false)
    }
    const styleOnClick = {
        backgroundColor: "#03bafc",
    }
    const backgroundNumber = {
        backgroundColor: "black"
    }
    return (
        <div className={`${(() => { return (props.className ? props.className : "notification") })()}`} style={(click ? styleOnClick : {})} onClick={
            () => {
                notificationValue.clearUnreadNotification();
                notificationValue.setNotificationBoxStatus(true)
                setClick(true);
                if (props.typeSelect !== "message" && props.typeSelect !== "messageactived") {
                    props.btnfunc("message");
                    setTimeout(() => {
                        props.btnfunc("messageactived")
                    }, 200)
                }
            }}>
            <i className={"fas fa-user-friends"} ></i>
            {notificationValue.state.unreadNotifications.length !== 0 &&
                <div style={(click ? backgroundNumber : {})}>
                    <p>{notificationValue.state.unreadNotifications.length}</p>
                </div>
            }
        </div>
    )
}
function UserInfor(props) {
    const notificationValue = useContext(NotificationContext)
    const [userName, setUserName] = useState("");
    const userinfoelement = useRef()
    const dialogContext = useContext(DialogContext)
    const history = useHistory()
    useEffect(() => {
        const callAPI = async () => {
            const username = await fetch(domain + "/info/profi",
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
                    return res.userName
                })
                .catch(err => {
                    console.log(err)
                    return null
                })
            setUserName(username)
        }
        callAPI()

    }, [props])
    const onBlur = (e) => {
        if (!e || !e.relatedTarget) {
            userinfoelement.current.className = 'user-menu'
            return
        }
        if (e.relatedTarget.className === 'user-menu-item' || e.relatedTarget.className === 'user-menu user-menu-active')
            return
        userinfoelement.current.className = 'user-menu'
    }
    return (
        <div id='user-info'>
            <div onFocus={() => {
                userinfoelement.current.className = 'user-menu user-menu-active'
            }} ref={userinfoelement} className='user-menu' tabIndex={1} onBlur={(e) => { onBlur(e) }}>
                <ul tabIndex>
                    <li className='user-menu-item' onClick={() => {
                        dialogContext.show()
                    }}> Change Avatar </li>
                    <li className='user-menu-item' onClick={async () => {
                        await fetch(domain + "/logout",
                            {
                                method: 'POST',
                                credentials: 'same-origin',
                            })
                            .then(res => {
                                if (res.status === 200) history.push("/login")
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }} > Log out</li>
                </ul>
            </div>
            <Avartar url={""} onFocus={() => {
                userinfoelement.current.className = 'user-menu user-menu-active'
            }} onBlur={(e) => {
                onBlur(e)
            }}
            />
            <h3 className='user-name'>{userName}</h3>
            <Notification className='notification' number={notificationValue.state.isOpenNotificationBox} btnfunc={props.showMessageFunc} {...props} />
        </div>
    )
}
export { UserInfor }