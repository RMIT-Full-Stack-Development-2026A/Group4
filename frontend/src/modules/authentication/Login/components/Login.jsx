// Importing dependencies: 
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/UserContext';

// Login form:
const Login = () => {
    // Auth Context:
    const { updateUserInfo } = useAuth();
    // States and hooks: 
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({
      email: '',
      password: ''
    })
    const [loggedOutTime, setLoggedOutTime] = useState(60);
    const [errorMessage, setErrorMessage] = useState('');
    const [loginAttempt, setLoginAttempt] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    // Functions:
    const submitLoginForm = async (e) => {
      e.preventDefault(); // Prevent form reload
      if (isLocked) return; // Ensure log in attempts are still valid
      try {
        // calling backend:
        const res = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(loginInput),
          credentials: 'include',
        });
        const data = await res.json();
        if (!res.ok) {
          setErrorMessage(data.message);
          handleLoginAttempts();
          return;
        }
        // putting token into cookie and redirecting user
        updateUserInfo(data.user);
        navigate('/lobby')
      }
      catch (err) {
        console.error(err);
        setErrorMessage('Connection error! Unable to log in.')
      }
    }
    // Handling changing input
    const handleChangingInput = (e) => {
      const {name, value} = e.target;
      setLoginInput((prev)=>({
        ...prev,
        [name]: value,
      }))
    };
    // Countdown timer:
    useEffect(()=>{
      let timer;
        if (isLocked && loggedOutTime > 0) {
            timer = setInterval(() => {
                setLoggedOutTime((prev) => prev - 1);
            }, 1000);
        }
        if (loggedOutTime === 0) {
            setIsLocked(false);
            setLoginAttempt(0);
            setLoggedOutTime(60); 
            setErrorMessage('');
        }
        return () => {clearInterval(timer)};
    }, [isLocked, loggedOutTime])
    // Log in attempts:
    const handleLoginAttempts = () => {
      setLoginAttempt((prev)=>{
        const nextAttempt = prev + 1;
        if (nextAttempt > 5) {
          setIsLocked(true);
        }
        return nextAttempt;
      })
    }
    // Returning JSX:
    return (
      <div className='flex justify-center'>
          <form className='shadow-[9px_18px_82px_8px_rgba(0,0,0,0.15)] flex flex-col gap-5 w-[50%] p-5' onSubmit={submitLoginForm}>
              <h1 className='text-3xl text-center font-semibold '>Log In</h1>
              <div className='flex flex-col gap-2'>
                <label className='text-xl text-gray-800 font-medium'>Email</label>
                <input className='bg-gray-100 rounded-sm p-3 text-gray-600'  value={loginInput.email} type='email' name='email' required onChange={handleChangingInput} />
              </div>
              <div className='flex flex-col gap-2 '>
                <label className='text-xl text-gray-800 font-medium'>Password</label>
                <input className='bg-gray-100 rounded-sm p-3 text-gray-600' value={loginInput.password} name='password' type='password'required onChange={handleChangingInput}  />
              </div>
              <button className={isLocked ? `p-3 cursor-not-allowed rounded-xl text-xl bg-gray-500 text-white` : `p-3 cursor-pointer rounded-xl text-xl bg-black text-white`} disabled={isLocked} type='submit'>{ !isLocked ? 'Log In' : 'Locked' }</button>
              <p className='text-gray-500 text-center'>Don't have an account? <Link className='text-gray-600' to='/signup'>Sign up here</Link></p>
              <div className='text-red-600 font-semibold text-center'>{ loginAttempt === 0 ? '' : ( loginAttempt < 6 ? `${errorMessage} ${loginAttempt} / 5 attempts remaining` : `Please try again in ${loggedOutTime} seconds...`)}</div>
          </form>
      </div>
    )
}

export default Login