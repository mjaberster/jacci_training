import React, { useEffect, useState, createContext, useContext } from "react";
import { useRef } from "react/cjs/react.development";

const AuthForm = () => {

    const usernameFocusRef = useRef(null);
    const passwordFocusRef = useRef(null);
    const submitFocusRef = useRef(null);
    const [username, setUsername] = useState("Guest")
    
    const [submitClicked, setSubmitClicked] = useState(0)
    const[submitedmsg, setSubmitedMsg] = useState("");
    
    
    useEffect(() => {
        setSubmitedMsg("Submited " + submitClicked);
    }, [submitClicked])


    

    const UserContext = createContext();

    return <React.Fragment>
        <form>
        
            <div>
                <span><label id="usernamelabel">Username:</label></span>
                <span><input type="text" id="usernamelabel" size="100px;" onMouseOver={
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
                } ref={usernameFocusRef}/></span>
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
                (e) => {
                    e.preventDefault();
                    setSubmitClicked(submitClicked + 1)
                    setUsername(usernameFocusRef.current.innerHtml)
                }
            }
            /></div>
        <label>{submitedmsg}</label>
        </form>
    </React.Fragment>
}

export default AuthForm;