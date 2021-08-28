import {LoginForm} from "./loginform"
import {Banner} from "./banner"
import "./css/login.css"
function Login() {
    return (
        <section id = "login-section">
            <LoginForm />
            <Banner />
        </section>
    )
}
export {Login}