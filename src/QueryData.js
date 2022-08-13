import React, { useState } from "react";

import { app,db } from "./fireBaseConfig.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    onSnapshot,
    query,  // creating a base for searching in docs
    where  // for condition search
} from "firebase/firestore";
import { useEffect } from "react";

function RealTimeDatabase() {

  const [data, setdata] = useState({

    name: "",
    password: "",
    age:""

  });

  const collectionRef = collection(db,"users");

  const storeData = (e) => {
    
    addDoc(collectionRef,{
        name:data.name,
        password:Number(data.password),
        age:data.age
    })
    .then((res)=>{
        console.log(res.id)
        setdata({
          name:"",
          password:'',
          age:''
        })
    })
    .catch((err)=>{
        console.log(err.message)
    })
    
  };

  const getData = ()=>{

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
  
  const ByAge = ()=>{

    // here querying data from firestore by age < 20
    const ageQuery = query(collectionRef, where("age","<",28))
  
    onSnapshot(ageQuery,(data)=>{
        console.log(data.docs.map((doc)=>{
            return {
               ...doc.data(),
               id:doc.id
            }
        }));
    })
  }

  const ByName = ()=>{

    // here querying data from firestore where name == aman
    const nameQuery = query(collectionRef, where("name","==","aman bisht"))
  
    onSnapshot(nameQuery,(data)=>{
        console.log(data.docs.map((doc)=>{
            return {
               ...doc.data(),
               id:doc.id
            }
        }));
    })
  }

  return (
    <div className="form">
      <input
        type="text"
        name="name"
        placeholder="Enter name"
        value={data.name}
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Enter the password"
        value={data.password}
        onChange={handleChange}
      /> 

      <input
        type="number"
        name="age"
        placeholder="Enter the age"
        value={data.age}
        onChange={handleChange}
      /> 

      <button type="submit"onClick={storeData}>
        Add Doc
      </button>

      <button type="submit"onClick={ByAge}>
        Query By Age
      </button>
      
      <button type="submit"onClick={ByName}>
        Query By Age
      </button>


    </div>
  );
}

export default RealTimeDatabase;

// FIREBASE QUERY THE DATA :::

/*

1.

*/