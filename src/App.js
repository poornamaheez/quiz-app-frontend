import {  BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Home';
import CreateUser from './createUser';
import LoginPage from './login';
import Questions from './Questions';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<CreateUser/>}/>
          <Route path='/start' element={<Questions/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
