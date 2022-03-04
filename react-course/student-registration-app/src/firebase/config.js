import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore/lite';
import 'firebase/firestore';
import "firebase/auth"
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBbdH_dUZdtLryF_wea4mUlzAKuBEZMIxU",
    authDomain: "student-registration-app-23970.firebaseapp.com",
    projectId: "student-registration-app-23970",
    storageBucket: "student-registration-app-23970.appspot.com",
    messagingSenderId: "844465419264",
    appId: "1:844465419264:web:d53b07735b25be82b754e5"
  };  

const app = initializeApp(firebaseConfig)
const ProjectFirestore = getFirestore(app)

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export default {ProjectFirestore, auth, provider, signInWithPopup, GoogleAuthProvider}