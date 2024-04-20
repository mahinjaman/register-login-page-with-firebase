// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChBUUogeI2KcOgDpM8Vt8LO7H-XCem4gc",
    authDomain: "auth-practice-93629.firebaseapp.com",
    projectId: "auth-practice-93629",
    storageBucket: "auth-practice-93629.appspot.com",
    messagingSenderId: "598368445398",
    appId: "1:598368445398:web:d0c740e105db12b236fa77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;