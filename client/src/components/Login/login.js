import { useEffect, useState } from "react"
import {LoginForm} from "./loginform"
import {Banner} from "./banner"
import "./css/login.css"
let windowSize = {width : undefined,height: undefined}
let Type = "pc"
function Login() {
    const [type, setType] = useState("pc")
    const [screenSize, setScreensize]    = useState(windowSize)
    const updateType = () => {
        windowSize.width = document.documentElement.clientWidth
        windowSize.height = document.documentElement.clientHeight
        if(windowSize.width <= 700 && Type !== "mobile" ){ 
            Type = "mobile"
            setType(Type)
        }
        else if (windowSize.width > 700 && Type !== "pc" ){    
            Type = "pc"
            setType(Type)
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
            <Banner screenType = {Type} />
            <LoginForm screenType = {type}/>
        </section>
    )

}
export {Login}