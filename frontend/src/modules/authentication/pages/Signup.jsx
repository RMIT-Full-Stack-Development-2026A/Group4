import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/UserContext'

const Signup = () => {
    const { 
        signUpInput, 
        errorMessage, 
        handleChangingInput, 
        handleSignupSubmission 
    } = useSignup();

  return (
    <div className='min-h-screen flex items-center justify-center
         bg-linear-to-br from-red-600 to-pink-500 px-4'>

            <form className='backdrop-blur-xl bg-white/20 border border-white/20
                            shadow-2xl rounded-3xl p-8 w-full max-w-md text-white flex flex-col gap-4' 
                  onSubmit={handleSignupSubmission}>
                    <h1 className='text-3xl text-center font-bold mb-2'>
                        Create Account
                    </h1>

                    {/*Username*/}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-white/80'>Username</label>
                        <input 
                        className='input-glass'
                        onChange={handleChangingInput}
                        required
                        type='text'
                        name='username'
                        value={signUpInput.username}/>
                    </div>

                    {/*Email*/}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-white/80'>Email</label>
                        <input
                        className='input-glass'
                        onChange={handleChangingInput}
                        name='email'
                        type='email'
                        required
                        value={signUpInput.email}
                        />
                    </div>

                    {/*Password*/}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-white/80'>Password</label>
                        <input
                        className='input-glass'
                        onChange={handleChangingInput}
                        name='password'
                        type='password'
                        required
                        value={signUpInput.password}
                        />
                    </div>

                    {/*Confirm Password*/}
                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-white/80'>Confirm Password</label>
                        <input
                        className='input-glass'
                        onChange={handleChangingInput}
                        name='confirmPassword'
                        type='password'
                        required
                        value={signUpInput.confirmPassword}
                        />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label className='text-sm text-white/80'>Country</label>
                        <select
                        className='input-glass text-white'
                        onChange={handleChangingInput}
                        required
                        name='country'
                        >
                            <option value="" className='text-black'>Select a country</option>
                            <option value="Vietnam" className='text-black'>Vietnam</option>
                            <option value="Singapore" className='text-black'>Singapore</option>
                            <option value="Japan" className='text-black'>Japan</option>
                            <option value="Malaysia" className='text-black'>Malaysia</option>
                        </select>
                    </div>

                    {/*Button*/}
                    <button
                    className='mt-3 py-3 bg-white text-red-600 font-bold
                    rounded-xl shadow-lg hover:bg-red-100 hover:scale-105
                    transition duration-300'
                    type='submit'
                    >
                        Sign Up
                    </button>

                    {/*Error*/}
                    <div className='text-center text-red-200 text-sm'>
                        {errorMessage}
                    </div>

                    {/*Link*/}
                    <p className='text-center text-white/80 text-sm'>
                        Already have an Account ? {" "}
                        <Link className='font-semibold underline' to='/login'>
                            Login
                        </Link>
                    </p>
                </form>
         </div>
  )
}

export default Signup