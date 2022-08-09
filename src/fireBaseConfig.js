import { initializeApp } from "firebase/app";  // to run firebase properly
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // to have access to firestore databse

// here this below is the config data 

const firebaseConfig = {
  apiKey: "AIzaSyDmijNP48NFmujvGlLBdxXXmYHKn7u9sbc",
  authDomain: "fir-learning-ab0c8.firebaseapp.com",
  projectId: "fir-learning-ab0c8",
  storageBucket: "fir-learning-ab0c8.appspot.com",
  messagingSenderId: "663514842131",
  appId: "1:663514842131:web:862c92afe7d7b7f9eb2be6",
  measurementId: "G-8T46KL5FVS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig); // here use this app in your root component tree

// get the instance of database
const db = getFirestore(app);

const analytics = getAnalytics(app);