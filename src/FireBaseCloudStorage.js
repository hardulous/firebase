import React, { useState } from "react";
import { app,db } from "./fireBaseConfig.js";

// functions to create collection , add document in that collection and read all docs present in collections
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

function FirebaseCloudStorage() {

  const [data, setdata] = useState({

    email: "",
    password: "",

  });

  // creating collection users with ref name users
  const collectionRef = collection(db,"users");

  // with each collection ref there is property called .id which contain its name
  console.log(collectionRef)

  const storeData = (e) => {
    
    // storing doc in database
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
    
    getDocs(collectionRef)
    .then((res)=>{
        
        console.log(res);

        const Docs = res.docs.map((doc)=>{
            return {
               ...doc.data(),
               id:doc.id
            }
        })

        console.log(Docs);

    })
    .catch((err)=>{
        console.log(err.message)
    })

  }

  const updateData = ()=>{
    
    // here we have ref to docs like /users/0CbcOsPBtffOrsbnEa1J
    const docRef = doc(db,"users","0CbcOsPBtffOrsbnEa1J")
    
    // here updating document email and password or we can update limited field as well and rest remain same
    updateDoc(docRef,{
        email:data.email,
        password:data.password
    })
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

  }

  const deleteData = ()=>{
     
    // ref of doc to delete
    const docRef = doc(db,"users","0CbcOsPBtffOrsbnEa1J")
    
    // here deleting complete doc
    deleteDoc(docRef)
    .then((res)=>{
        console.log(res)
    })
    .catch((err)=>{
        console.log(err)
    })

  }

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

      <input
        type="text"
        name="email"
        placeholder="Enter updated email"
        value={data.email}
        onChange={handleChange}
      />

      <button type="submit"onClick={storeData}>
        Store doc
      </button>
      <button type="submit"onClick={getData}>
        Get Docs
      </button>
      <button type="submit"onClick={updateData}>
        Update Docs
      </button>
      <button type="submit"onClick={deleteData}>
        Delete First Doc
      </button>
    </div>
  );
}

export default FirebaseCloudStorage;

// FIREBASE CLOUD STORAGE :::

/*

1. whatever document and object we will add to database a unique key attribute will be also added to that docs as well , we can get it by    .id property 

2. in order to perform any operation in database first create a reference we can create both collection ref and document ref by method called doc.

3. 


*/
