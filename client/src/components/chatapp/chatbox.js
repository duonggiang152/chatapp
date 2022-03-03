'use strict'
/**
 * module dependecies
 */
import { useEffect, useReducer } from "react";
import { useHistory } from 'react-router-dom'
import {SlideBar} from "./slidebar";
import {ChatContent} from "./chatcontent"
import domain from "../../config/domain";
import {ResponsesiveContext} from "./context"
import socketIO from "../../controller/socketIO";
/**
 * Private variable
 */
// initial state
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
        setMobileModeOnSlideBar : () => {dispathResponsiveMethod({type: actions.turn_mobile_slide_bar})},
        setMobileModeOnChatbox  : () => {dispathResponsiveMethod({type: actions.turn_mobile_chatbox})}

    }
    // variable
    const history = useHistory()
    // update the type of the screen
    const checkType = () => {
        console.log(valueResponsiveContext.state)
        console.log(document.documentElement.clientWidth)
        console.log("hello")
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
    useEffect(() => {
        checkType();
        socketIO.connect()
        window.addEventListener('resize', checkType)
    },[])
    return (
        <ResponsesiveContext.Provider value = {valueResponsiveContext}>
            <div id="chatapp" style = {{overflow: "hidden", display: "flex", width: "100vw", position: "relative"}}>
                <SlideBar/>
                <ChatContent/>
            </div>
        </ResponsesiveContext.Provider>
    )
}
export {ChatApp}