import '../css/App.css';
// Importing every pages
import SignUp from './SignUp'
import Profile from './Profile'
import SaveProfile from './SaveProfile';
import EditProfile from './EditProfile'
import Home from './Home';
import React from 'react'
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path='/save' element={<SaveProfile />} />
        <Route path='/edit' element={<EditProfile />} />
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
    </div>
  );
}

export default App;
