import React, { useState } from "react";

// importing app from firebase file
import { app } from "./fireBaseConfig.js";
// importing function for authentication, getAuth is a function to check whether we are authenticated or not and 2nd one is used to create user with email and password and 3rd method is used to sign in user
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,   // for google authentication
  signInWithPopup,     // to open a new window for authentication
  GithubAuthProvider,  // for github authentication
} from "firebase/auth";

function Authenticate() {

  const [data, setdata] = useState({

    email: "",
    password: "",

  });

  let auth = getAuth();

  // create instance of google provider object first
  const googleProvider = new GoogleAuthProvider();

  // create instance of github provided object 
  const gitHubProvider = new GithubAuthProvider();

  const handleSubmit = (e) => {
    
    if (e.target.name==="Sign-up") {

      // authenticate a user with provided email and password and only allow that user whose email is present in firebase database and if password or email is wrong then throw an error
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });

    } else if(e.target.name=="Sign-in") {

      // create user with provided email and password and saved in firebase database as well and if 2nd time same email is used for creating a user will throw an error
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if(e.target.name==="google-sign-in"){

      signInWithPopup(auth, googleProvider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    }
    else if(e.target.name==="github-sign-in"){

      signInWithPopup(auth, gitHubProvider)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    }
    
  };

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="form">
      <input
        type="text"
        name="email"
        placeholder="Enter email"
        value={data.email}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter the password"
        value={data.password}
        onChange={handleChange}
      />

      <button type="submit" name="Sign-up" onClick={handleSubmit}>
        Sign-up
      </button>
      <button type="submit" name="Sign-in" onClick={handleSubmit}>
        Sign-in
      </button>
      <button type="submit" name="google-sign-in" onClick={handleSubmit}>
        google sign-in
      </button>
      <button type="submit" name="github-sign-in" onClick={handleSubmit}>
        github sign-in
      </button>
    </div>
  );
}

export default Authenticate;

// FIREBASE ::::

/*

1. first create a project in firebase , then create an app in that project and install sdk kit for your project using command npm install firebase

2. now create the firebase config files and copy-paste all code present in it

3. for firebase authentication go to docs and section authentication

4. for real time database read docs of either cloud firestore or real time database

*/
