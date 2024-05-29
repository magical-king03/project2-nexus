import '../css/App.css';
import SignUp from './SignUp'
import Home from './Home';
import React from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
