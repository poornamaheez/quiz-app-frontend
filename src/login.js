import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import axios from 'axios';
import './login.css';
import PopUp from "./PopUp";

function LoginUser() {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [useModal,setUseModal] = useState(false);
  const [givenMessage,setGivenMessage] = useState('Something went wrong');
  const [typeOfMsg, setTypeOfMsg] = useState("false");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login/user', loginData);
      console.log(response.data);
      setGivenMessage(response.data);
      setTypeOfMsg("true");
      // You can redirect to the user's dashboard or show a success message
    } catch (error) {
      console.error(error);
      setGivenMessage(error.response.data);
      setTypeOfMsg("false");
      // Handle error: display an error message or take appropriate action
    }
  };

  return (
    <div className='login'>
    <div className='TotalContent'>
      <h2 className='heading'>Login</h2>
      <form className='login-form' onSubmit={handleSubmit}>
        <div className='container'>
          <input
            type="text"
            className='input-form'
            id='InnerHint'
            placeholder='user-name'
            name='username'
            value={loginData.username}
            onChange={handleChange}
          />
        </div>
        <div className='container'>
          <input
            type="password"
            className='input-form'
            id='InnerHint'
            placeholder='password'
            name='password'
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className='login-button' onClick={()=>{setUseModal(true)}}>Login</button>
      </form>
      <p className='to-register'>Don't have an account?<br /> <Link to="/register" className='register-link'>create an account</Link></p>
      
      
    </div>
      <div className='popup-msg'>
      {useModal && <PopUp  showMsg={setUseModal} message={givenMessage} msgType={typeOfMsg}/>}      
      </div>
    </div>
  );
}

export default LoginUser;