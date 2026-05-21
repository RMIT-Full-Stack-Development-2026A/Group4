// Importing dependencies: 
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/UserContext';
import { User } from 'lucide-react';
import useLogin from '../hooks/useLogin';

// Login form:
const Login = () => {
    // Hooks
    const { 
        loginInput, errorMessage, loginAttempt, isLocked, 
        loggedOutTime, handleChangingInput, submitLoginForm 
    } = useLogin();

    return (

  <div className='min-h-screen flex items-center justify-center 
    bg-linear-to-br from-red-600 to-pink-500 px-4'>

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
              className='input-glass w-full '
              value={loginInput.email}
              type='email'
              name='email'
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
              {loggedOutTime !== null ? (
                  `Account locked. Please try again in ${loggedOutTime} seconds...`
              ) : (
                  // Standard error or Deactivation error
                  loginAttempt > 0 && !isLocked 
                    ? `${errorMessage} (${loginAttempt} / 5 attempts used)` 
                    : errorMessage
              )}
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