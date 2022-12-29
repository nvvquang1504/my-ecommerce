// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB-KxOIYwYlexEsKnCZnFvjO3NWtYbNoBk",
    authDomain: "my-ecommerce-5ca67.firebaseapp.com",
    projectId: "my-ecommerce-5ca67",
    storageBucket: "my-ecommerce-5ca67.appspot.com",
    messagingSenderId: "801817791607",
    appId: "1:801817791607:web:76a9c40d8c56fd48c7ca72",
    measurementId: "G-HRZ21XGQ6Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);