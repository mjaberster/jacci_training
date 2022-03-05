import { React, useState } from "react"
import validator from "validator"
import { RegisterUser } from "../auth/login"
import { useNavigate } from 'react-router-dom';

const RegistrationForm = () => {

    const [username, setUsername] = useState("")
    const [fullName, setFullname] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const [passwordCheckMessage, setPasswordCheckMessage] = useState("")
    const [isValidForm, setIsValidForm] = useState(false)

    const [emailCheckMessage, setEmailCheckMessage] = useState("")
    const [phoneCheckMessage, setPhoneCheckMessage] = useState("")

    const [registrationStatus, setRegistrationStatus] = useState("")

    const changeUserName = (e) => {
        setUsername(e.target.value)
    }
    
    const changePassword = (e) => {
        setPassword(e.target.value)
    }

    const checkPassword = (e) => {
        if(password === e.target.value) {
            setPasswordCheckMessage("")
            setIsValidForm(true)
            setPasswordConfirm(e.target.value)
            return
        }
        setPasswordCheckMessage("Passwords are not match")
        setIsValidForm(false)
        setPasswordConfirm(e.target.value)
        return
    }

    const changeEmail = (e) => {
        setEmail(e.target.value)
    }

    const changePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }

    const changeFullName = (e) => {
        setFullname(e.target.value)
    }
    
    const validateAndSubmit = async () => {
        if(!validateForm()) {
            console.log("Form not valid")
            return
        }
        await register()
    }


    const navigate = useNavigate();

    const register = async () => {
        const user = {
            username,
            fullName,
            email,
            phoneNumber,
            password
        }
        setRegistrationStatus(await RegisterUser(user))
        navigate('/');
    }

    const validateForm = () => {
        let valid = true
        if(!isValidForm) {
            valid = false
        }

        if(!validator.isEmail(email)) {
            console.log("email not valid")
            setEmailCheckMessage(`Email is not valid`)
            valid = false
        }
        if(!validator.isMobilePhone(phoneNumber)) {
            console.log("phone not valid")
            setPhoneCheckMessage("Phone is not valid")
            valid = false
        }

        console.log(`valid ${valid}`)
        return valid

    }
    
    return <div>
                    
                    <div>
                        <span>Username</span>
                        <span><input type="text" placeholder="Username" 
                            onChange={changeUserName} style={{color:"#000000"}} value={username}
                            required /> </span>
                    </div>
                    <div>
                        <span>Fullname</span>
                        <span><input type="text" placeholder="Fullname" 
                            onChange={changeFullName} style={{color:"#000000"}} value={fullName}
                            required /> </span>
                    </div>
                    <div>
                        <span>Password</span>
                        <span><input type="password" placeholder="Password"
                            onChange={changePassword} style={{color:"#000000"}} value={password}
                            required /> </span>
                    </div>
                    <div>
                        <span>Re-type your password</span>
                        <span><input type="password" placeholder="Password" 
                            onChange={checkPassword} style={{color:"#000000"}} value={passwordConfirm}
                            required /></span>
                        <span><label>{passwordCheckMessage}</label></span>
                    </div>
                    <div>
                        <span>Email</span>
                        <span><input type="text" placeholder="me@example.com" 
                            onChange={changeEmail} style={{color:"#000000"}} value={email} required/></span>
                            <span><label>{emailCheckMessage}</label></span>
                    </div>

                    <div>
                        <span>Phone Number</span>
                        <span><input type="text" placeholder="055555555" 
                            onChange={changePhoneNumber} style={{color:"#000000"}} value={phoneNumber}
                            required/></span>
                            <span><label>{phoneCheckMessage}</label></span>
                    </div>
                    <div>
                        <span><input type="button" onClick={validateAndSubmit} value="Register" style={{color:"#000000"}}/></span>
                    </div>
                    <div>{registrationStatus}</div>
            </div>
        }

export default RegistrationForm
