import { ChatApp } from './components/chatapp/chatbox'
import { Login } from './components/Login/login'
import {
    BrowserRouter,
    Router,
    Switch,
    Route,
    Link,
  } from "react-router-dom";
import './app.css'
function Hello() {
    return <h1>Hello</h1>
}
function App() {
    return (
        // <ChatApp></ChatApp>
        <BrowserRouter>
            <Switch>
                <Route path = "/" component = {ChatApp} exact />
                <Route path = "/login" component = {Login} exact />
            </Switch>
          
        </BrowserRouter>
       
    )
}

export {App}