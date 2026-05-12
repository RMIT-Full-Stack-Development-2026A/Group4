import React from 'react'
import { Link } from 'react-router-dom'

const LoginButton = () => {
  return (
    <Link className=' bg-gray-900 text-white pb-2 pt-2 pr-5 pl-5 rounded-lg hover:bg-gray-600 text-2xl hover:text-white transition-all duration-300' to='/login'>Log In</Link>
  )
}

export default LoginButton