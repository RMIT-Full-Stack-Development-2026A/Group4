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
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}auth/signup`, {
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
    <div className='flex justify-center'>
        <form className='shadow-[9px_18px_82px_8px_rgba(0,0,0,0.15)] flex flex-col gap-5 w-[50%] p-5' onSubmit={handleSignupSubmission}>
            <h1 className='text-3xl text-center font-semibold '>Join Us!</h1>
            <div className='flex flex-col gap-2'>
                <label className='text-xl text-gray-800 font-medium' htmlFor='username'>Username:</label>
                <input className='bg-gray-100 rounded-sm p-3 text-gray-600' onChange={handleChangingInput} required type='text' name='username' value={signUpInput.username} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-xl text-gray-800 font-medium' htmlFor='email'>Email:</label>
                <input className='bg-gray-100 rounded-sm p-3 text-gray-600' onChange={handleChangingInput} name='email' type='email' required value={signUpInput.email} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-xl text-gray-800 font-medium' htmlFor='password'>Password: </label>
                <input className='bg-gray-100 rounded-sm p-3 text-gray-600' onChange={handleChangingInput} name='password' type='password' required value={signUpInput.password} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-xl text-gray-800 font-medium' htmlFor='confirmPassword'>Confirm Password:</label>
                <input className='bg-gray-100 rounded-sm p-3 text-gray-600' onChange={handleChangingInput} name='confirmPassword' type='password' required value={signUpInput.confirmPassword} />
            </div>
            <div className='flex flex-col gap-2'>
                <label className='text-xl text-gray-800 font-medium' htmlFor='country'>Country:</label>
                <select className='bg-gray-100 rounded-sm p-3 text-gray-600' id='country' onChange={handleChangingInput} value={signUpInput.country} required name='country'>
                    <option value="">Select a country</option>
                    <option value="Vietnam">Vietnam</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Japan">Japan</option>
                    <option value="Malaysia">Malaysia</option>
                </select>
            </div>
            <button className='p-3 cursor-pointer bg-black text-white text-semibold text-xl rounded-xl' type='submit'>Sign Up</button>
            <div>{errorMessage}</div>
            <p className='text-center text-gray-500'>Already have an account? <Link className='text-boldtext-gray-700' to='/login'>Log in here</Link></p>
        </form>
      
    </div>
  )
}

export default Signup