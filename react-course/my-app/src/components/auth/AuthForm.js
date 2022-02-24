import React, { useContext, useState} from "react";
import { useRef } from "react/cjs/react.development";
import { UserContext } from "../../context/UserContext";
import './auth.css'

const AuthForm = () => {

    const usernameFocusRef = useRef(null);
    const passwordFocusRef = useRef(null);
    const submitFocusRef = useRef(null);
    const [username, setUsername] = useState("Guest")
    const [password, setPassword] = useState("")
    const [loginStatusMessage, setLoginStatusMessage] = useState("")
    
    const userContext = useContext(UserContext)
    
    return <React.Fragment>
        <form>
        
            <div>
                <span><label id="usernamelabel" >Username:</label></span>
                <span><input type="text" id="usernamelabel" size="100px;" placeholder="username" onMouseOver={
                    () => {
                        usernameFocusRef.current.style.backgroundColor = "white"
                        usernameFocusRef.current.style.color = "black"
                    }
                } 
                onMouseOut={
                    () => {
                        usernameFocusRef.current.style.backgroundColor = "black"
                        usernameFocusRef.current.style.color = "white"
                    }
                } /></span>
            </div>
            <div>
                <span><label id="passwordlabel">Password:</label></span>
                <span><input type="password" id="passwordlabel" size="100px;" onMouseOver={
                    () => {
                        passwordFocusRef.current.style.backgroundColor = "white"
                        passwordFocusRef.current.style.color = "black"
                    }
                } 
                onMouseOut={
                    () => {
                        passwordFocusRef.current.style.backgroundColor = "black"
                        passwordFocusRef.current.style.color = "white"
                    }
                } ref={passwordFocusRef}/></span>
            </div>
            <div><input type="submit" ref={submitFocusRef} id="submitb"
            
            onMouseOver={
                () => {
                    submitFocusRef.current.style.backgroundColor = "white"
                    submitFocusRef.current.style.color = "black"
                }
            } 
            onMouseOut={
                () => {
                    submitFocusRef.current.style.backgroundColor = "black"
                    submitFocusRef.current.style.color = "white"
                }
            } 
            onClick={
                async (e) => {
                    e.preventDefault();
                    setUsername(usernameFocusRef.current.innerHtml)
                    setPassword(passwordFocusRef.current.innerHtml)
                    console.log(username)
                    console.log(password)
                    await userContext.login(username, password, userContext)
                    console.log(`loginResult ${userContext}`);
                    if(userContext.loginMsg) {
                        setLoginStatusMessage(userContext.loginMsg)
                        return
                    }
                }
            }
            /></div>
            <div><span>{loginStatusMessage}</span></div>
        </form>
    </React.Fragment>
}

export default AuthForm;