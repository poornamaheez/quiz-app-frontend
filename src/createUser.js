import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './createUser.css'; // Import the CSS file

function CreateUser() {
  const [user, setUser] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/create/user', user);
      console.log(response.data);
      window.alert(response.data);
    } catch (error) {
      console.error(error);
      window.alert(error.response.data);
    }
  };

  return (
    <div className='register'>
    <div className="create-user-container">
      <h2>Create User</h2>
      <form className="create-user-form" onSubmit={handleSubmit}>
        <div>
          
          <input
            type="text"
            name="username"
            placeholder='user-name'
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div>
         
          <input
            type="password"
            name="password"
            placeholder='password'
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
      <p>Already registered? <br /> <Link to="/login" className='login-link'>log in</Link></p>
    </div>
    </div>
  );
}

export default CreateUser;
