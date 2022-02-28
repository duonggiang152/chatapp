import { useEffect, useState } from "react"
import LoginForm from "./loginform"
import Banner from "./banner"
import "./css/login.css"
let windowSize = {width : undefined,height: undefined}
let Type = "pc"
function Login() {
    // state for store type of screen
    const [type, setType] = useState()

    /**
     * function update type every time screen change
     * 
     * screenWidth <= 700 px   display in mobile mode
     * 
     * screenWidth > 700 px    display in pc mode
     * 
     */
    const updateType = () => {
        windowSize.width = document.documentElement.clientWidth
        windowSize.height = document.documentElement.clientHeight
        if((windowSize.width <= 700 || windowSize.height <= 400)  ){ 
            setType("mobile")
        }
        else if ((windowSize.width > 700 || windowSize.height > 400)){    
            setType("pc")
        }
        
    } 
    useEffect(() => {
        updateType();
        window.addEventListener('resize',updateType)
        return () => {
            window.removeEventListener('resize', updateType)
        }
    }, [])
    return (
        <section id = "login-section">
            <Banner screenType = {type} />
            <LoginForm/>
        </section>
    )

}
export {Login}