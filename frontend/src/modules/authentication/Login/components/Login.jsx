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
      let interval = null;
      if (isLocked && loginAttempt > 0) {
        // reduce every second: 
        interval = setInterval(()=>{
          setLoggedOutTime((prev) => prev-1);
        }, 1000);
      }
      // Checking if 60 seconds have passed
      else if (loggedOutTime === 0) {
        setIsLocked(false);
        setLoginAttempt(0);
        setErrorMessage('');
      }
      // returning to terminate the previous interval
      return () => {
        if (interval) clearInterval(interval);
      }
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
      <div className='text-red-500'>
          <form onSubmit={submitLoginForm}>
              <h1>Log in!</h1>
              <div>
                <label>Email:</label>
                <input value={loginInput.email} type='email' name='email' required onChange={handleChangingInput} />
              </div>
              <div>
                <label>Password:</label>
                <input value={loginInput.password} name='password' type='password'required onChange={handleChangingInput}  />
              </div>
              <button disabled={isLocked} type='submit'>{ !isLocked ? 'Log In' : 'Locked' }</button>
          </form>
          <div>{ loginAttempt === 0 ? '' : ( loginAttempt < 6 ? `Invalid Credentials! ${loginAttempt} / 5 attempts remaining` : `Please try again in ${loggedOutTime} seconds...`)}</div>
          <p>Don't have an account? Sign up <Link to='/signup'>here</Link></p>
      </div>
    )
}

export default Login