import React, {useState} from "react";
import {Form, Card, Button} from 'react-bootstrap'
import {app} from "../../firebase/config"
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPopup, signInWithPhoneNumber } from "firebase/auth";
import "./signin.css"
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhonNumber] = useState("")
    const [OTP, setOTP] = useState("")

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

  function handleGoogleLogin(event) {
    event.preventDefault();
    googleSignIn()
  }

  const handleOtpLogin = (e) =>{
    e.preventDefault()
    otpLogin()
  }

  const generateRecaptcha = (auth) => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {

        }
    }, auth);
  }

  const otpLogin = () => {
    
    const auth = getAuth(app)
    auth.useDeviceLanguage()
    generateRecaptcha(auth)
    let appVerifier = window.recaptchaVerifier
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
    }).catch((error) => {
      console.log(error)
    });
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    if(OTP.length === 6) {
        let confirmationResult = window.confirmationResult
        confirmationResult.confirm(OTP).then((result) => {
            const user = result.user
            console.log(user)
        }).catch((error) => {
            console.log(error)
        })
    }
  }

    const googleSignIn = () => {
        console.log("googleSignIn")
        signInWithPopup(getAuth(app), new GoogleAuthProvider())
        .then((result) => {
            console.log(result)
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log(token)
            console.log(user)
         })
        .catch((error) => {
            console.log(error)
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(credential)
        })
    }
    return <>
        <div className="Login">
            <Button block size="lg" type="submit" onClick={handleGoogleLogin}>
                Login With Google
            </Button>
        </div>
        <div>
            <span><label>Phone: </label></span>
            <span><input type="text" value={phoneNumber} onChange={(e) => setPhonNumber(e.target.value)} /></span>
            <span>
                <Button onClick={handleOtpLogin}>
                    OTP
                </Button>
            </span>
        </div>
        <div>
            <label>OTP: </label><input type="text" onChange={(e) => setOTP(e.target.value)} />
            <input type="submit" onClick={verifyOtp} />
        </div>
        <div id="recaptcha-container"></div>
    </>
}

export default SignIn