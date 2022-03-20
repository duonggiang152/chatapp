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
export  {ResponsesiveContext, NotificationContext}