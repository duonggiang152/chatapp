/**
 * module dependencies
 */
import {useRef, useContext, createContext, useReducer} from 'react'
import "./css/loginform.css"
import domain from "../../config/domain"
import { useHistory } from 'react-router-dom'
/**
 * Private variable 
 */
// create context for shareing message in child node
const MessageContext = createContext()
// initial state
const initialState = {
    type : undefined,
    message : undefined
}
// acction
const actions = {
    update_login_message: "UPDATE_LOGIN_MESSAGE",
    update_register_message: "UPDATE_REGISTER_MESSAGE"
}
// Reducer to handdle acction
const reducer = (state, action) => {
    switch(action.type) {
        case actions.update_login_message:
            return {
                type: "UPDATE_LOGIN_MESSAGE",
                message: action.message
            }
        case actions.update_register_message:
            return {
                type : "UPDATE_REGISTER_MESSAGE",
                message: action.message
            }
        default:
            throw new Error(`Not support ${state.type}`)
    }
}
/**
 * Login component
 * 
 */
function Login() {
    const Message = useContext(MessageContext)
    const usernameInputElement = useRef(null)
    const passwordInputElement = useRef(null)
    const history = useHistory()
    const Login = async () => {
        const username = usernameInputElement.current.value
        const password = passwordInputElement.current.value
        if(!username) {
            Message.updateLoginMessage("Username must be fill")
            return
        }
        else if(username.length < 4) {
            Message.updateLoginMessage("Username must containt at leat 4 charecter")
            return
        }
        if(!password) {
            Message.updateLoginMessage("Password must be fill")
            return
        }
        else if(password.length < 6) {
            Message.updateLoginMessage("Password must containt at least 6 charecter")
            return
        }
        const data     = new URLSearchParams()
        data.append("userName", username)
        data.append("password", password)
        const route = domain + "/login"
        await fetch(route,
            {
               method: 'POST',
               headers : {
                   'Content-Type': 'application/x-www-form-urlencoded',
               },
               credentials: 'include',
               body: data
            })
        .then(async response => {
            if(response.status === 200) {
                history.push("/")
                return
            }
            response = await response.json()
            Message.updateLoginMessage(response.message)
            return 
        })
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <>
        <form className = "form" id = "login-form" method="POST">
            <h3>Đăng Nhập</h3>
            <div className='message'>{Message.MessageState.type === actions.update_login_message ? Message.MessageState.message : ""}</div>
            <div>
                <input ref={usernameInputElement} name = "username" placeholder = "Tài khoản" type = "text"></input>
                <input ref={passwordInputElement} autocomplete="off" name = "password" placeholder = "Mật khẩu" type = "password"></input>
                <input onClick={Login} value = "Đăng Nhập" type = "button"></input>
            </div>
        </form>
        </>
    )
}
function Register() {
    const usernameInputElement = useRef(null)
    const passwordInputElement = useRef(null)
    const verifyInputElement   = useRef(null)
    const Message = useContext(MessageContext)
    const registerForm = useRef(null)
    const registerOnClick = (e) => {
        registerForm.current.classList.add("active_aniamtion");
        registerForm.current.classList.remove("active_aniamtion_btn_login");
        console.log(registerForm.current.childNodes[0].classList.remove("select_btn"))
    }
    const loginBtnOnClick = (e) => {
        registerForm.current.classList.add("active_aniamtion_btn_login");
        registerForm.current.classList.remove("active_aniamtion");
        registerForm.current.childNodes[0].classList.add("select_btn")
    }
    const postRegister = async () => {
        const userName = usernameInputElement.current.value
        const password = passwordInputElement.current.value
        const verifiPassword = verifyInputElement.current.value
        if(password !== verifiPassword) {
            Message.updateRegisterMessage("Confirm password must match")
            return
        }
        const userRegisterData = {
            userName: userName,
            password: password
        }
        const route = domain + "/register"
        await fetch(route,
            {
               method: 'POST',
               headers : {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify(userRegisterData)
            })
        .then(async response => {
            if(response.status === 200) {
                Message.updateLoginMessage("Register succeed")
                loginBtnOnClick()
                return
            }
            response = await response.json()
            Message.updateRegisterMessage(response.message)
            return
        })
    }
    return (
        <form ref = {registerForm} className = "form active_aniamtion_btn_login" id = "register-form">
            <h3 className = "select_btn" onClick = {registerOnClick}>Đăng Kí</h3>
            <div className='message'>{Message.MessageState.type === actions.update_register_message ? Message.MessageState.message : ""}</div>
            <div>
                <input ref={usernameInputElement} name = "username" placeholder = "Tài khoản" type = "text"></input>
                <input ref={passwordInputElement} name = "password" placeholder = "Mật khẩu" type = "password"></input>
                <input ref={verifyInputElement} name = "verifypassword" placeholder = "Nhập lại mật khẩu" type = "password"></input>
                <input value = "Đăng kí" type = "button" onClick={postRegister}></input>
                <div onClick = {loginBtnOnClick} id = "btn-login">
                    Đăng Nhập tại đây  
                </div>
            </div>
        </form>
    )
}
function LoginForm() {
    const [MessageState, dispathMessageMethod] = useReducer(reducer, initialState)
    const value = {
        MessageState: MessageState,
        updateLoginMessage : (LoginMessage) => {dispathMessageMethod({type: actions.update_login_message, message: LoginMessage})},
        updateRegisterMessage: (RegisterMessage) => {dispathMessageMethod({type: actions.update_register_message, message: RegisterMessage})}
    }
    return (
        <MessageContext.Provider value={value}>
            <div id = "form-container">
            <Login/>
            <Register />
            </ div>
        </MessageContext.Provider>
    )
}
export default LoginForm 