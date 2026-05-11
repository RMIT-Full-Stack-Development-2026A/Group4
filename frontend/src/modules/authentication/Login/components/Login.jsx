// Importing dependencies: 
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/UserContext';
import { User } from 'lucide-react';

// Login form:
const Login = () => {
    // Auth Context:
    const { updateUserInfo } = useAuth();
    // States and hooks: 
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({
      email: '',
      password: '',
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
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/login`, {
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
  <div className='min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-red-600 to-pink-500 px-4'>

      <form
        className='backdrop-blur-xl bg-white/10 border border-white/20 
        shadow-2xl rounded-3xl p-8 w-full max-w-md 
        flex flex-col gap-5 text-white'
        onSubmit={submitLoginForm}
      >
          <h1 className='text-3xl text-center font-bold mb-2'>
            Welcome Back
          </h1>

          {/* Email */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm text-white/80'>Email</label>
            <input
              className='input-glass'
              value={loginInput.email}
              type='email'
              name='email'
              required
              onChange={handleChangingInput}
            />
          </div>

          {/* Password */}
          <div className='flex flex-col gap-1'>
            <label className='text-sm text-white/80'>Password</label>
            <input
              className='input-glass'
              value={loginInput.password}
              name='password'
              type='password'
              required
              onChange={handleChangingInput}
            />
          </div>

          {/* Button */}
          <button
            className={
              isLocked
                ? `py-3 rounded-xl text-lg bg-gray-400 text-white cursor-not-allowed`
                : `py-3 rounded-xl text-lg bg-white text-red-600 font-bold 
                   hover:bg-red-100 hover:scale-105 
                   transition duration-300 shadow-lg`
            }
            disabled={isLocked}
            type='submit'
          >
            {!isLocked ? 'Log In' : 'Locked'}
          </button>

          {/* Error */}
          <div className='text-center text-red-200 text-sm'>
            {loginAttempt === 0
              ? ''
              : loginAttempt < 6
              ? `${errorMessage} ${loginAttempt} / 5 attempts remaining`
              : `Please try again in ${loggedOutTime} seconds...`}
          </div>

          {/* Link */}
          <p className='text-center text-white/80 text-sm'>
            Don't have an account?{" "}
            <Link className='underline font-semibold' to='/signup'>
              Register here
            </Link>
          </p>
      </form>
  </div>
)
}

export default Login