// Importing dependencies: 
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
// Login form:
const Login = () => {
    // States and hooks: 
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({
      email: '',
      password: ''
    })
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
        navigate('/home')
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
    // Log in attempts;
    const handleLoginAttempts = () => {
      setLoginAttempt((prev)=>{
        const nextAttempt = prev + 1;
        // checking if log in attempts are exceeded:
        if (nextAttempt > 5) {
          setIsLocked(true),
          setErrorMessage('Too many attempts. Try again in 60 seconds.');
          // 60 seconds time out:
          setTimeout(()=>{
            setIsLocked(false);
            setLoginAttempt(0);
            setErrorMessage('');
          }, 60000);
        }
        // Returning attempt
        return nextAttempt;
      })
    }
    return (
      <div>
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
          <div>{errorMessage}</div>
          <p>Don't have an account? Sign up <Link to='/signup'>here</Link></p>
      </div>
    )
}

export default Login