import React, { useState } from "react";
import { app, db, storage } from "./fireBaseConfig.js";

// To upload a file to Cloud Storage, you first create a reference to the full path of the file, including the file name using this ref method
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function FileStorage() {

  const [data, setdata] = useState({
    file:"",
    imgUrl:"",
  });

  const handleSubmit = (e) => {

    console.log(data);

    // creating ref of image to upload on storage and in folder image 
    const imgRef = ref(storage, `images/${data.file.name}`);

    // uploadaing file in database
    const uploadTask = uploadBytesResumable(imgRef, data.file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on("state_changed",

      (snapshot) => {

        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded and using this we can create a progress bar as well 
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log("Upload is " + progress + "% done");

        switch (snapshot.state) {

          case "paused":
            console.log("Upload is paused");
            break;

          case "running":
            console.log("Upload is running");
            break;

        }
      },

      (error) => {
        
        console.log(error);

        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setdata({...data,imgUrl:downloadURL})
        });
      }
    );
  };

  return (
    <div className="form">
      <input
        type="file"
        onChange={(e) => {
          setdata({
            ...data,
            file:e.target.files[0]
          });
        }}
      />

      <button type="submit" onClick={handleSubmit}>
        Store file
      </button>

      <img src={data.imgUrl} alt="Downloaded img" />

    </div>
  );
}

export default FileStorage;

// FIREBASE CLOUD STORAGE :::

/*

1. here as by default only authorized user have access to storage but we can make it public by changing security rules 


*/
