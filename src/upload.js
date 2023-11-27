import React, { useState } from 'react';
import axios from 'axios';
import './upload.css';
import PopUp from './PopUp';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [useModal,setUseModal] = useState(false);
  const [msg, setMsg] = useState(null);
  const [typeOfMsg, setTypeOfMsg] = useState(null);

  if(localStorage.getItem("privilege")!=="admin"){
    window.location.href='/login';
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('questions', selectedFile);

      axios.post('http://localhost:8080/api/upload', formData)
        .then((response) => {
          setMsg(response.data);
          setTypeOfMsg("true");
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
          setMsg(error.response.data);
          setTypeOfMsg("false");
        });
    }
    setUseModal(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href='/';
  };


  return (
    <div className='uploadContainer'>
        <div className="top-message">
        <h1>Welcome Admin</h1>
      </div>
      <div className="logout">
        <button onClick={handleLogout}>Logout</button>
      </div>
        <div className='uploadFile'>
            <div className='head'>
              <h1>File Upload</h1>
            </div>
            <div className='body'>
              <input type="file" accept=".xlsx" onChange={handleFileChange} id='ji'/>
              <label for="ji"><p className='upload-msg'>{selectedFile?selectedFile.name:'Click Here'}</p></label>
              <button onClick={handleFileUpload} className='upload'>Upload</button>
            </div>
        </div>
        <div className='popup-ms'>          
          {useModal && <PopUp  showMsg={setUseModal} message={msg} msgType={typeOfMsg}/>}
        </div>
         </div>
  );
}

export default Upload;