import React, { useContext, useState} from "react";
import { UserContext } from "../../context/UserContext";
import './auth.css'
import { Link } from 'react-router-dom';

const AuthForm = () => {

    const [username, setUsername] = useState("Guest")
    const [password, setPassword] = useState("")
    const [loginStatusMessage, setLoginStatusMessage] = useState("")
    
    const userContext = useContext(UserContext)
    
    return <React.Fragment>
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
            <div><input type="submit" id="submitb" onClick={
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
            /></div>
            <div><span>{loginStatusMessage}</span></div>
        </form>
    </React.Fragment>
}

export default AuthForm;