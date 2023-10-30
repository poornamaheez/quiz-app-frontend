import {BrowserRouter, Route, Routes} from 'react-router-dom';
import React from 'react';
import './App.css';
import HomePage from './Home';
import CreateUser from './createUser';
import LoginPage from './login';
import Questions from './Questions';
import Result from './result';
import Upload from './upload';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<CreateUser/>}/>
          <Route path='/start' element={<Questions/>}/>
          <Route path='/result' element={<Result/>}/>
          <Route path='/admin' element={<Upload/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;