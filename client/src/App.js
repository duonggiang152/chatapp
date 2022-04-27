import { ChatApp } from './components/chatapp/chatbox'
import { Login } from './components/Login/login'
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";
import './app.css'
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