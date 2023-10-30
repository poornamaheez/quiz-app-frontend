import React, { useState } from 'react';
import axios from 'axios';
import './upload.css';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

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
          console.log('File uploaded successfully:', response.data);
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
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
              <label for="ji"><p className='upload-msg'>Click Here</p></label>
              <button onClick={handleFileUpload} className='upload'>Upload</button>
            </div>
        </div>
    </div>
  );
}

export default Upload;