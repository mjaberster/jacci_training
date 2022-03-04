import React, {useState} from "react";
import {Form, Card, Button} from 'react-bootstrap'
import fbconfig from "../../firebase/config"
import "./signin.css"
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

  function handleSubmit(event) {
    event.preventDefault();
  }
    const googleSignIn = () => {
        fbconfig.signInWithPopup(fbconfig.auth, fbconfig.provider)
        .then((result) => {
            const credential = fbconfig.GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;

            console.log(token)
            console.log(user)
         })
        .catch((error) => {

            console.log(error)
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = fbconfig.GoogleAuthProvider.credentialFromError(error);
        })
    }
    return <>
        <div className="Login">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    autoFocus
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </Form.Group>
                <Button block size="lg" type="submit" disabled={!validateForm()}>
                Login
                </Button>
            </Form>
    </div>
    </>
}

export default SignIn