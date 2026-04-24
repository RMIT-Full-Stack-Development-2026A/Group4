import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/UserContext'
import Logout from '../reusable/Logout';
import { useState } from 'react';

const NavBar = () => {
    const {user, updateUserInfo} = useAuth();
    const [dropDown, setDropDown] = useState(false);
    return (
      <nav>
        {
            user 
            ? 
            <div>
             {user.username}
              <Link to='/profile'>
                <div>
                  <img></img>
                </div>
              </Link>
              <Logout />
            </div>
            : 
            <div>
              <Link to='/login'>Log in</Link>
              <Link to='/signup'>Sign up</Link>
            </div>
        }
      </nav>
  )
}

export default NavBar