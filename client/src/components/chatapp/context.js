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
// for checking the type of screen in every node tree inside the route "/"
// const SizeScreenContext = React.createContext("pc")

// const ActiveChatContentMobileVersion = React.createContext()
export  {ResponsesiveContext}