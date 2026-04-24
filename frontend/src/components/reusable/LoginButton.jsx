import React from 'react'
import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Link className='border-black border pb-2 pt-2 pr-5 pl-5' to='/login'>Log In</Link>
  )
}

export default LoginButton