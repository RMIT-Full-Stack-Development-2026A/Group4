import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../../context/UserContext'

const Signup = () => {
    const {user, updateUserInfo} = useAuth();
    // States:
    const navigate = useNavigate();
    const [signUpInput, setSignUpInput] = useState({
        username: '',
        email : '',
        password: '',
        confirmPassword: '',
        country: '',
    })
    const [errorMessage, setErrorMessage] = useState('');
    // Functions:
    // handling signup submission:
    const handleSignupSubmission = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signUpInput),
                credentials: 'include',
            })
            const data = await res.json();
            if (!res.ok) {
                setErrorMessage( data.message ||'Error signing up! Please try again later...')
                return;
            }
            updateUserInfo(data.user);
            navigate('/lobby');
        }
        catch (err) {
            setErrorMessage('Connection error. Is server running?')
        }
    }
    // Handling changing input
    const handleChangingInput = (e) => {
        const {name, value} = e.target;
        setSignUpInput((prev)=>({
            ...prev,
            [name]: value
        }))
    }
  return (
    <div>
        <form onSubmit={handleSignupSubmission}>
            <div>
                <label htmlFor='username'>Username:</label>
                <input onChange={handleChangingInput} required type='text' name='username' value={signUpInput.username} />
            </div>
            <div>
                <label htmlFor='email'>Email:</label>
                <input onChange={handleChangingInput} name='email' type='email' required value={signUpInput.email} />
            </div>
            <div>
                <label htmlFor='password'>Password: </label>
                <input onChange={handleChangingInput} name='password' type='password' required value={signUpInput.password} />
            </div>
            <div>
                <label htmlFor='confirmPassword'>Confirm Password:</label>
                <input onChange={handleChangingInput} name='confirmPassword' type='password' required value={signUpInput.confirmPassword} />
            </div>
            <div>
                <label htmlFor='country'>Country:</label>
                <select id='country' onChange={handleChangingInput} value={signUpInput.country} required name='country'>
                    <option value="">Select a country</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Japan">Japan</option>
                    <option value="Malaysia">Malaysia</option>
                </select>
            </div>
            <button type='submit'>Sign Up</button>
        </form>
        <div>{errorMessage}</div>
        <p>Already have an account? Log in <Link to='/login'>here</Link></p>
    </div>
  )
}

export default Signup