// firebase file

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAFz32K--VCfsC9rXRm4QeK3dgKqIZUEvM",
    authDomain: "hostelbookingapp1.firebaseapp.com",
    projectId: "hostelbookingapp1",
    storageBucket: "hostelbookingapp1.appspot.com",
    messagingSenderId: "141515127444",
    appId: "1:141515127444:web:b0c3d8d4ed14cd7b2dd281"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// firebase firestore
export const db = getFirestore(app);

// firebase auth
export const auth = getAuth(app);

// firebase storage
export const storage = getStorage(app);
