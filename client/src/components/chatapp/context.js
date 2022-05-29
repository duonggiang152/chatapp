import React from 'react'
/**
 * store globle context variable
 * 
 * state {
 * 
 *  screenType,
 * 
 *  mobileProperties: {
 *      slidebar,
 *      content
 *  }
 * }
 * 
 *  setPCMode               : () =>,
 * 
 *  setMobileModeOnSlideBar : () =>,
 * 
 *  setMobileModeOnChatbox  : () =>
 *
 * Default value undefine
 */
const ResponsesiveContext = React.createContext()
/** 
* initialNotificaionContext = {
*     isOpenNotificationBox: false
* }
*/
const NotificationContext = React.createContext()
const ChatContext = React.createContext()
const DialogContext = React.createContext()
const ControleCurrenRoomContext = React.createContext()
const NewMessageContext         = React.createContext()
const BtnNavBarContext          = React.createContext()
export {BtnNavBarContext, ResponsesiveContext, NotificationContext, ChatContext, DialogContext, ControleCurrenRoomContext, NewMessageContext}