'use strict'
/**
 * module dependecies
 */
import { useEffect, useReducer } from "react";
import { useHistory } from 'react-router-dom'
import {SlideBar} from "./slidebar";
import {ChatContent} from "./chatcontent"
import domain from "../../config/domain";
import {ResponsesiveContext, NotificationContext} from "./context"
import socketIO from "../../controller/socketIO";
/**
 * Private variable
 */
// initial state responsive context
// ------------------------------------------------------------------
const initialState = {
    screenType : undefined,
    mobileProperties: {
        slidebar: undefined,
        content : undefined
    }
}
// acction to handle ResponsiveContext module
const actions = {
    turn_pc_mode            :"TURN-PC-MODE",
    turn_mobile_slide_bar   :"TURN-MOBILE-SLIDE-BAR",
    turn_mobile_chatbox     :"TURN-MOBILE-CHATBOX"
}
// reducer to handle ResponsiveContext module
const reducer = (state, action) => {
    switch(action.type) {
        case actions.turn_pc_mode:
            return {
                screenType: "pc",
                mobileProperties: {
                    slidebar : undefined,
                    content: undefined 
                }
            }
        case actions.turn_mobile_slide_bar :
            return {
                screenType: "mobile",
                mobileProperties: {
                    slidebar: true,
                    content : false
                }
            }
        case actions.turn_mobile_chatbox : {
            return {
                screenType: "mobile",
                mobileProperties : {
                    slidebar : false,
                    content  : true
                }
            }
        }
        default:
            throw new Error(`Not support ${action.type}`)
    }
}
//--------------------------------------------------------------------------------
// initial notificationcontext
const initialNotificaionContext = {
    isOpenNotificationBox: false,
    unreadNotifications     : [],
    Notifications           : []
}
// action
const NotificationActions = {
    setNotificationBoxStatus : "SET_NOTIFICATION_BOX_STATUS",
    addUnreadNotification    : "ADD_UNREAD_NOTIFICATION",
    clearAllNewNotification  : "READ_UNREAD_NOTIFICATION",
    initUnreadNotification   : "UNREAD_NOTIFICATION_INIT",
    initNotification         : "INIT_NOTIFICATION",
    addNotification          : "ADD_NOTIFICATION"

}
// reducer Notification
const reducerNotification = (state, actions) => {
    switch(actions.type){
        case NotificationActions.initNotification: {
            return {
                isOpenNotificationBox: state.isOpenNotificationBox,
                unreadNotifications  : [...state.unreadNotifications],
                Notifications        :[...actions.initNoti]
            }
        }
        case NotificationActions.addNotification: {
            return {
                isOpenNotificationBox: state.isOpenNotificationBox,
                unreadNotifications  : [...state.unreadNotifications],
                Notifications        :[...state.Notifications, actions.noti ]
            }
        }
        case NotificationActions.initUnreadNotification: {
            return {
                isOpenNotificationBox: state.isOpenNotificationBox,
                unreadNotifications  : [...actions.unreadNoti],
                Notifications        :[...state.Notifications]
            }
        }
        case NotificationActions.setNotificationBoxStatus: {
            return {
                isOpenNotificationBox: actions.status,
                unreadNotifications     : [...state.unreadNotifications],
                Notifications        :[...state.Notifications]
            }
        }
        case NotificationActions.addUnreadNotification: {
            return {
                isOpenNotificationBox: state.isOpenNotificationBox,
                unreadNotifications: [...state.unreadNotifications,{id: actions.notificationID}],
                Notifications        :[...state.Notifications]
            }
        }
        case NotificationActions.clearAllNewNotification : {
            return {
                isOpenNotificationBox: state.isOpenNotificationBox,
                unreadNotifications: [],
                Notifications        :[...state.Notifications]
            }
        }
        default:
            throw new Error(`Not support ${actions.type}`)
    }
}
//--------------------------------------------------------------------------------
/**
 * Fuction for generate all component in url "/" include side bar in the left and chat box in the right
 * @returns ChatApp component
 */
function ChatApp() {
    // init state for deciding display app in mobile or in pc mode
    const [ResponsesiveState, dispathResponsiveMethod] = useReducer(reducer, initialState)
    // value for ResponsiveContext
    const valueResponsiveContext = {
        state                   : ResponsesiveState,
        setPCMode               : () => {dispathResponsiveMethod({type: actions.turn_pc_mode})},
        setMobileModeOnSlideBar : () => {
            dispathResponsiveMethod({type: actions.turn_mobile_slide_bar})
        },
        setMobileModeOnChatbox  : () => {
            dispathResponsiveMethod({type: actions.turn_mobile_chatbox})
        }

    }
    // init state for notificationbox
    const [NotificationState, dispathNotificationContext] = useReducer(reducerNotification, initialNotificaionContext)
    // set method and value for child elements
    const valueNotificationContext = {
        state: NotificationState,
        initUnreadNotification: (unreadNotifications) => {
            dispathNotificationContext({type: NotificationActions.initUnreadNotification, unreadNoti: unreadNotifications})
        },
        setNotificationBoxStatus: (status) => {
            dispathNotificationContext({type: NotificationActions.setNotificationBoxStatus, status: status})
        },
        addUnreadNotification: (notificationID) => {
            dispathNotificationContext({type: NotificationActions.addUnreadNotification, notificationID: notificationID})
        },
        initNotification: (notifications) => {
            dispathNotificationContext({type: NotificationActions.initNotification, initNoti: notifications})
        },
        addNotification: (noti) => {
            dispathNotificationContext({type: NotificationActions.addNotification, noti: noti})
        },
        clearUnreadNotification: () => {
            const unreadNoti = valueNotificationContext.state.unreadNotifications

            unreadNoti.forEach(element => {
                fetch(domain + "/notification/read/" + `${element.ntfID}`,
                {
                   method: 'POST',
                   credentials: 'same-origin',
                   headers : {
                       'Content-Type': 'application/json'
                   }
                })
            });
            dispathNotificationContext({type: NotificationActions.clearAllNewNotification})
        }
    }
    // variable
    const history = useHistory()
    // update the type of the screen
    const checkType = () => {
        if((document.documentElement.clientWidth >= 610) ) { 
            valueResponsiveContext.setPCMode()
        }
        else if((document.documentElement.clientWidth < 610 )) {
            valueResponsiveContext.setMobileModeOnSlideBar()
        };
    }
    // checking if connection was auth
    fetch(domain + "/isauth/",
        {
           method: 'GET',
           credentials: 'same-origin',
           headers : {
               'Content-Type': 'application/json'
           }
        })
    .then(async response => {
        if(response.status === 200) {
            return
        }
        else {
            history.push("/login")
            return
        }
    })
    .catch(err => {
        console.log(err)
    })
    useEffect(async () => {
        checkType();
        window.addEventListener('resize', checkType)
        socketIO.connect()
        socketIO.listen('new-notification', notification => {
            NotificationContext.addNotification(notification)
            if(NotificationState.isOpenNotificationBox) return
            valueNotificationContext.addUnreadNotification(notification)
        })
        // get unread notification
        await fetch(domain + "/notification/unread",
        {
           method: 'GET',
           credentials: 'same-origin',
           headers : {
               'Content-Type': 'application/json'
           }
        })
        .then(async response => {
            return await response.json()
        })
        .then(data => {
            const unreadNoti = data['unreadNoti']
            valueNotificationContext.initUnreadNotification(unreadNoti)
        })
        .catch(err => {
            console.log(err)
        })
        // get notification for init
        await fetch(domain + "/notification",
        {
            method: 'GET',
            credentials: 'same-origin',
            headers : {
                'Content-Type': 'application/json'
            }
        })
        .then(async response => {
            return await response.json()
        })
        .then(data => {
            valueNotificationContext.initNotification(data)
        })
        .catch(err => {
            console.log(err)
        })
    },[])
    return (
        <ResponsesiveContext.Provider value = {valueResponsiveContext}>
           
                <div id="chatapp" style = {{overflow: "hidden", display: "flex", width: "100vw", position: "relative"}}>
                <NotificationContext.Provider value={valueNotificationContext}>
                    <SlideBar/>
                </NotificationContext.Provider>
                    <ChatContent/>
                </div>
            
        </ResponsesiveContext.Provider>
    )
}
export {ChatApp}