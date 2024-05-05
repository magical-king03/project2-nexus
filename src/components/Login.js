import React, { useState, useEffect } from 'react'
import { auth, provider, email_auth } from '../config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

  const [loggedMail, setLoggedMail] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileName, setProfileName] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(email_auth, email, password);
      const user = userCredential.user;
      localStorage.setItem('email', user.email);
      console.log(email)
      let name = email.substring(0, email.indexOf('@'))
      console.log(name)
      setProfileName(name)
      console.log(profileName)
      navigate(`/profile/${name}`);
    } catch (error) {
      console.error(error);
    }
  }
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setEmail(data.user.email)
      localStorage.setItem("email", data.user.email);
      let email = data.user.email
      let name = email.substring(0, email.indexOf('@'))
      setProfileName(name)
      navigate(`/profile/${name}`);
    }).catch((error) => {
      console.error();
    })
  }

  useEffect(() => {
    setLoggedMail(localStorage.getItem("email"))
  })

  return (
    <div className='flex items-center justify-center m-5'>
      <div>
        <h1 className='font-bold text-3xl mb-4'>Login Page</h1>
        <form onSubmit={handleSubmit} className='signup-form'>
          <input
            type="email"
            placeholder="Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='m-4 p-3 rounded-lg border border-1 border-black w-full'
          />
          <br />
          <input
            type="password"
            placeholder="Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='m-4 p-3 rounded-lg border border-1 border-black w-full'
          />
          <br />
          <button type="submit" className='px-4 py-2 border border-1 border-black rounded-lg text-white bg-black m-4'>Login</button>
        </form>
        <div>
          <button onClick={handleClick} className='border border-1 border-black m-4 p-4 w-full rounded-3xl'>Continue with google</button>
        </div>
        <p className='ml-4'>Create new account?  <Link to="/signup" className='underline text-[#0000ff]'>Sign up</Link></p>
      </div>
    </div>
  )
}

export default Signup