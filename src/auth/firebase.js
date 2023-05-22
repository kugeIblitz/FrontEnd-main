// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5gqS1LTSvh8WFnyjIvJMLgJsD3J4z2Tk",
  authDomain: "symfonyreact-79403.firebaseapp.com",
  projectId: "symfonyreact-79403",
  storageBucket: "symfonyreact-79403.appspot.com",
  messagingSenderId: "795552133831",
  appId: "1:795552133831:web:c19cf29b068173510a84e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);