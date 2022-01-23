import "./css/loginform.css"
import {useRef} from 'react'
function Login() {
    return (
        <>
        <form className = "form" id = "login-form">
            <h3>Đăng Nhập</h3>
            <div>
                <input name = "username" placeholder = "Tài khoản" type = "text"></input>
                <input autocomplete="off" name = "password" placeholder = "Mật khẩu" type = "password"></input>
                <input value = "Đăng Nhập" type = "submit"></input>
            </div>
        </form>
        </>
    )
}
function Register() {
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
    return (
        <form ref = {registerForm} className = "form" id = "register-form">
            <h3 className = "select_btn" onClick = {registerOnClick}>Đăng Kí</h3>
            <div>
                <input name = "username" placeholder = "Tài khoản" type = "text"></input>
                <input name = "password" placeholder = "Mật khẩu" type = "password"></input>
                <input name = "verifypassword" placeholder = "Nhập lại mật khẩu" type = "password"></input>
                <input value = "Đăng kí" type = "submit"></input>
                <div onClick = {loginBtnOnClick} id = "btn-login">
                    Đăng Nhập tại đây  
                </div>
            </div>
        </form>
    )
}
function LoginForm() {
    return (
        <div id = "form-container">
        <Login/>
        <Register />
        </ div>
    )
}
export { LoginForm }