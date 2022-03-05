import fbconfig from "../../firebase/config"

export const RegisterUser = async (user) => {
    
    // console.log(">>>> Registering ...")
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = {
    //     "username": user.username,
    //     "fullName": user.fullName,
    //     "password": user.password,
    //     "email": user.email,
    //     "phoneNumber": user.phoneNumber
    // };

    // console.log(`>>> ${raw}`)

    // var requestOptions = {
    // method: 'POST',
    // headers: myHeaders,
    // body: JSON.stringify(raw),
    // mode: 'no-cors'
    // };

    // fetch("http://localhost:3001/user/register", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

    let buff = Buffer.from(user.password);
    let base64password = buff.toString('base64');

    var axios = require('axios');
    var data = JSON.stringify({
    "username": user.username,
    "fullName": user.fullName,
    "password": base64password,
    "email": user.email,
    "phoneNumber": user.phoneNumber
    });

    var config = {
    method: 'post',
    url: 'http://localhost:3001/user/register',
    headers: { 
        'Content-Type': 'application/json'
    },
    data : data
    };

    axios(config)
    .then(function (response) {
        console.log(response.status)
        
        if(response.status === 200) {
            console.log(response.data)
            const userContext = {
                loginMsg: response.data.message,
                token: response.data.token
            }
            console.log("User has been loged in successfuly")
            console.log(userContext.token)
            localStorage.setItem("token", userContext.token)
            return true
        } else {    
            console.log("User failed to login")
            return false
        } 
    })
    .catch(function (error) {
        console.log(error);
        return false
    });

}






export const Login = async (username, password, userContext) => {

    console.log(username)
    console.log(password)

    const headers = {
        username: username,
        password: password,
        "Content-Type": "application/json"
    }

    fetch('http://localhost:3001/user/login', {
        "method": "POST",
        headers,
        mode: 'no-cors'
    }).then((res) => {
        console.log(`Trying to convert response to JSON ${JSON.stringify(res)}`)
        res.json().then(data => {
            console.log(JSON.stringify(data))
        })
    }
        // console.log(`Trying to convert response to JSON ${JSON.stringify(res)}`)
        // return res.json().then((data) => {
        //     if(!data || !data.err) {
        //         userContext.loginMsg= data.message
        //         userContext.loginStatus = data.status
        //         userContext.token = data.setToken
        //         console.log("User has been loged in successfuly")
        //     } else {
                
        //         userContext.loginMsg= res.err
        //         userContext.loginStatus = res.status
        //         userContext.token = null
        //         console.log("User failed to login")
        //     }   
        // })
        
            // console.log(`res status is not OK, it is ${res.status} and response message is ${res.statusText}`)
            // console.log(JSON.stringify(res))
            // return {
            //     err: "User failed to login",
            //     reason: res.statusText,
            //     status: res.status
            // }
       // }
    ).catch(err => {
        userContext.loginMsg= err.message
        userContext.loginStatus= err.status
        userContext.token= null
        console.log(`User failed to login due to an error (${err.message}, ${err.status}`)
    })
}

export const GoogleLogin = () => {
    fbconfig.signInWithPopup(fbconfig.auth, fbconfig.provider)
        .then((result) => {
            const credential = fbconfig.GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            
            localStorage.setItem("googleUser", user)
         })
        .catch((error) => {

            console.log(error)

            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = fbconfig.GoogleAuthProvider.credentialFromError(error);
        })
}

export const GoogleLogout = () => {
    fbconfig.auth.signOut()
    localStorage.removeItem("googleUser")
}

export const Logout = () => {
    localStorage.removeItem("token")
}