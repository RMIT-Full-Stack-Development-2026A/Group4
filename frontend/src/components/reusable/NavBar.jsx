// Importing dependencies: 
import React from 'react'
import { Link } from 'react-router-dom';
// Importing components
import LoginButton from './LoginButton';
import SignupButton from './SignUpButton';
import Logout from './Logout';
import Logo from './Logo';

// Component:
const NavBar = () => {
    return (
      <nav className='flex justify-between align-center'>
        <div>
          <Logo />
        </div>
        <div>
          <LoginButton />
          <SignupButton />
        </div>
      </nav>
  )
}

export default NavBar