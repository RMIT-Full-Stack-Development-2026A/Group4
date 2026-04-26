import React from 'react'
import { Link } from 'react-router-dom'

const SignupButton = () => {
  return (
    <Link className='p-5 border-1-black text-center' to='/signup'>Sign up</Link>
  )
}

export default SignupButton