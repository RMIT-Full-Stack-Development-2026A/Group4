// Importing dependencies: 
import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/UserContext'
import { useState } from 'react';
// Importing components
import LoginButton from '../reusable/LoginButton';
import SignupButton from '../reusable/SignupButton';
import Logout from '../reusable/Logout';
import DropDownMenu from './DropDownMenu';

// Component
const NavBar = () => {
    const {user, updateUserInfo} = useAuth();
    const [dropDown, setDropDown] = useState(false);
    // Toggle dropdown:
    const toggleDropDown = () => {
      setDropDown(!dropDown);
    }
    return (
      <nav>
        {
            user 
            ? 
            <div className='flex align-center justify-between'>
              <Link to='/lobby'>TicTacToang</Link>

              <div className='cursor-pointer' onClick={toggleDropDown}>
                <img></img>
                {user.username}
                <div>
                  { dropDown ? <DropDownMenu />:  <></> }
                </div>
              </div>
            </div>
            : 
            <div>
              <LoginButton />
              <SignupButton />
            </div>
        }
      </nav>
  )
}

export default NavBar