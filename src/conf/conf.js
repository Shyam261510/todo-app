import { initializeApp } from "firebase/app";
const conf ={
    apiKey: "AIzaSyDJGU7CLifEK_C2_nuFldboLJQGqx5z8Fo",
    authDomain: "todo-app-f583e.firebaseapp.com",
    projectId: "todo-app-f583e",
    storageBucket: "todo-app-f583e.appspot.com",
    messagingSenderId: "271894223012",
    appId: "1:271894223012:web:1c5b324302608d9e6e6e31",
    measurementId: "G-GYPJL7VZNF",
    dbUrl:"https://todo-app-f583e-default-rtdb.firebaseio.com/"
}
export const app = initializeApp(conf)