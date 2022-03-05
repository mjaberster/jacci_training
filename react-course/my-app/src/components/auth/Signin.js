import React, {useContext, useState} from "react";
import {Button} from 'react-bootstrap'

import './signin.css'
import { Link } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import { propTypes } from "react-bootstrap/esm/Image";


const SignIn = (props) => {
    const [loginStatusMessage, setLoginStatusMessage] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    const userContext = useContext(UserContext)

    const googleLogin = () => {
        userContext.googleLogin()
        userContext.refreshLoginState()
    }

    const googleLogout = () => {
        userContext.googleLogout()
        userContext.refreshLoginState()
    }

    if(userContext.isLogedIn){
        return <div>
            <Button onClick={googleLogout}>Sign Out</Button> 
        </div>
    } else {
    return <>
        <div className="Login">
        <form>
        
            <div>
                <div>
                    <span>
                        <Link to="/register">Register</Link>
                    </span>
                </div>
                <span><label id="usernamelabel" >Username:</label></span>
                <span><input type="text" id="usernamelabel" size="100px;" placeholder="username" /></span>
            </div>
            <div>
                <span><label id="passwordlabel">Password:</label></span>
                <span><input type="password" id="passwordlabel" size="100px;" /></span>
            </div>
            <div>
                <span>
                <input type="submit" value={"login"} onClick={
                async (e) => {
                    e.preventDefault();
                    // setUsername(usernameFocusRef.current.innerHtml)
                    // setPassword(passwordFocusRef.current.innerHtml)
                    // console.log(username)
                    // console.log(password)
                    // await userContext.login(username, password, userContext)
                    // console.log(`loginResult ${userContext}`);
                    // if(userContext.loginMsg) {
                    //     setLoginStatusMessage(userContext.loginMsg)
                    //     return
                    // }
                }
            }
            /></span>
            <span><Button onClick={googleLogin}>Sign In with Google</Button></span></div>
            <div><span>{loginStatusMessage}</span></div>
        </form>
        </div>
    </>
    }
}

export default SignIn