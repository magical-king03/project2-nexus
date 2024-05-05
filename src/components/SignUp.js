import React, { useState, useEffect } from 'react'
import { auth, provider, email_auth } from '../config';
import { createUserWithEmailAndPassword, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../css/App.css'

const Signup = () => {

  const [loggedMail, setLoggedMail] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      alert("Fill all the details...")
    } else {
      try {
        const userCredential = await createUserWithEmailAndPassword(email_auth, email, password);
        console.log(userCredential);
        const user = userCredential.user;
        localStorage.setItem('email', email)
        localStorage.setItem('token', user.accessToken);
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/save')
      } catch (error) {
        if (error.toString().includes("auth/email-already-in-use")) {
          alert("Email already exists... Please login to continue")
        }else if(error.toString().includes("auth/weak-password")){
          alert("Password should contain atleast 6 characters...")
        }
      }
    }
  }
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setEmail(data.user.email)
      localStorage.setItem("email", data.user.email);
      navigate("/save")
    }).catch((error) => {
      console.error();
    })
  }

  useEffect(() => {
    setLoggedMail(localStorage.getItem("email"))
  }, [loggedMail])

  const [emailLogin, setEmailLogin] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    if (emailLogin === "" || passwordLogin === "") {
      alert("Fill all the details...")
    } else {
      try {
        console.log("hi")
        const userCredential = await signInWithEmailAndPassword(email_auth, emailLogin, passwordLogin);
        const user = userCredential.user;
        console.log(user)
        localStorage.setItem('email', user.email);
        console.log(emailLogin)
        let name = emailLogin.substring(0, emailLogin.indexOf('@'))
        console.log(name)
        navigate(`/profile/${name}`);
      } catch (error) {
        if (error.toString().includes("auth/invalid-credential")) {
          alert("Invalid credentials... Please sign up")
        }
      }
    }
  }
  const handleClickLogin = () => {
    signInWithPopup(auth, provider).then((data) => {
      setEmail(data.user.email)
      localStorage.setItem("email", data.user.email);
      let email = data.user.email
      let name = email.substring(0, email.indexOf('@'))
      navigate(`/profile/${name}`);
    }).catch((error) => {
      console.error();
    })
  }

  return (
    <div className='flex items-center justify-center m-5 login-signup-body'>
      <div className="w-[350px] h-[500px] bg-[#ff0000] rounded-[10px] main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="realtive w-full h-full signup">
          <form>
            <label htmlFor="chk" aria-hidden="true" className="text-[#fff] text-[2.3em] flex justify-center m-[30px] font-bold cursor-pointer">Sign up</label>
            <input type="email" name="email" placeholder="Email" required className="flex justify-center my-[20px] mx-auto p-[20px] border-0 rounded-[5px] h-[20px] w-[60%]" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="password" name="pswd" placeholder="Password" className="flex justify-center my-[20px] mx-auto p-[20px] border-0 rounded-[5px] h-[20px] w-[60%]" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="button mb-2 w-[60%] h-[40px] my-[10px] mx-auto block justify-center text-[#fff] bg-[#573b8a] text-[1em] font-bold mt-[20px] border-0 rounded-[5px] cursor-pointer" onClick={handleSubmit}>Sign up</button>
            <p className="text-white font-bold text-center text-3xl m-0 p-0">or</p>
            <div>
              <button onClick={handleClick} className="button flex justify-center items-center gap-2 font-normal mt-2 w-[60%] h-[40px] my-[10px] mx-auto block justify-center text-[#fff] bg-[#573b8a] text-[1em] font-bold mt-[20px] border-0 rounded-[5px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                <p>Continue with google</p>
              </button>
            </div>
          </form>
        </div>

        <div className="h-[460px] bg-[#eee] login">
          <form>
            <label htmlFor="chk" aria-hidden="true" className="text-[#fff] text-[2.3em] flex justify-center m-[60px] mb-[30px] font-bold cursor-pointer">Login</label>
            <input type="email" name="email" placeholder="Email" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)} required className="flex justify-center my-[20px] mx-auto p-[20px] border-0 rounded-[5px] h-[20px] w-[60%]" />
            <input type="password" name="pswd" placeholder="Password" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} required className="flex justify-center my-[20px] mx-auto p-[20px] border-0 rounded-[5px] h-[20px] w-[60%]" />
            <button onClick={handleSubmitLogin} className="button w-[60%] h-[40px] my-[10px] mx-auto block justify-center text-[#fff] bg-[#573b8a] text-[1em] font-bold mt-[20px] border-0 rounded-[5px] cursor-pointer">Login</button>
            <p className="text-[#573b8a] font-bold text-center text-3xl m-0 p-0">or</p>
            <div>
              <button onClick={handleClickLogin} className="button flex justify-center items-center gap-2 font-normal mt-2 w-[60%] h-[40px] my-[10px] mx-auto justify-center text-[#fff] bg-[#573b8a] text-[1em] font-bold mt-[20px] border-0 rounded-[5px] cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="28" height="28" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                </svg>
                <p>Continue with google</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup