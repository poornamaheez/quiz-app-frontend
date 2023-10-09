import {  BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import HomePage from './Home';
import CreateUser from './createUser';
import LoginPage from './login';
import Questions from './Questions';
import Result from './result';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<CreateUser/>}/>
          <Route path='/start' element={<Questions/>}/>
          <Route path='/rem' element={<Result/>}/>{/* need to rempove */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;