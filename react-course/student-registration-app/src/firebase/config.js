import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBbdH_dUZdtLryF_wea4mUlzAKuBEZMIxU",
    authDomain: "student-registration-app-23970.firebaseapp.com",
    projectId: "student-registration-app-23970",
    storageBucket: "student-registration-app-23970.appspot.com",
    messagingSenderId: "844465419264",
    appId: "1:844465419264:web:d53b07735b25be82b754e5"
  };  

const app = initializeApp(firebaseConfig)

export {app}