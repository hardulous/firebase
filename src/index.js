import React from 'react';
import ReactDOM from 'react-dom/client';
import Authenticate from './Authenticate';
import FirebaseCloudStorage from "./FireBaseCloudStorage.js"
import FileStorage from "./FileStorage.js"
import RealTimeDatabase from './RealTimeUpdateData';
import QueryData from "./QueryData.js"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    {/* <Authenticate/> */}
    
    {/* <FirebaseCloudStorage/> */}
    
    {/* <FileStorage/> */}

    {/* <RealTimeDatabase/> */}

    <QueryData/>

  </React.StrictMode>
);

