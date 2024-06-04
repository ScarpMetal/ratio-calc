// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyBbBMSZa9mJlqnb4tX1C4zlqxc3bCxh1ZY",
	authDomain: "ratio-calc-753e5.firebaseapp.com",
	projectId: "ratio-calc-753e5",
	storageBucket: "ratio-calc-753e5.appspot.com",
	messagingSenderId: "33908668626",
	appId: "1:33908668626:web:12da28839430cd6941550b",
	measurementId: "G-KY7MDCLSTB"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)