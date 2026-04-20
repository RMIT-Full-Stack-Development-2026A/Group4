import React from 'react'
import { Link } from 'react-router-dom'
// Importing components:
import Login from '../../authentication/Login/components/Login'
import Signup from '../../authentication/Signup/components/Signup';

const NavBar = () => {
  return (
    <div>
        <nav>
            <Link to='/login' element={<Login/>}>Log In</Link>
            <Link to='/signup' element={<Signup/>}>Sign Up</Link>
        </nav>
    </div>
  )
}

export default NavBar