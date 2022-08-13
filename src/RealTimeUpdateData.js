import React, { useState } from "react";

import { app,db } from "./fireBaseConfig.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    onSnapshot
} from "firebase/firestore";
import { useEffect } from "react";

function RealTimeDatabase() {

  const [data, setdata] = useState({

    email: "",
    password: "",

  });

  const collectionRef = collection(db,"users");

  const storeData = (e) => {
    
    addDoc(collectionRef,{
        email:data.email,
        password:data.password
    })
    .then((res)=>{
        console.log(res,res.id)
    })
    .catch((err)=>{
        console.log(err.message)
    })
    
  };

  const getData = ()=>{
    
    // here this callback function have data param which is same as res returned by getDocs method and it is executed once at initial mount and then  executed everytime there is a change in the firebase database by update , delete and re-render
    onSnapshot(collectionRef,(data)=>{
        console.log(data.docs.map((doc)=>{
            return {
               ...doc.data(),
               id:doc.id
            }
        }));
    })

  }

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    
    getData();

  }, [])
  

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

      <button type="submit"onClick={storeData}>
        Add Doc
      </button>
    </div>
  );
}

export default RealTimeDatabase;

// FIREBASE REAL TIME UPDATE DATA :::

/*

1. to get real time update on data we have to use onSnapshot method

*/