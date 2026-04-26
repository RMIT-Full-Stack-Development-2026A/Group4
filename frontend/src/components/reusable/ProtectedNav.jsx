import React from 'react'
import { useState } from 'react';
import { useAuth } from '../../context/UserContext';
import DropDownMenu from './DropDownMenu';
import { Link } from 'react-router-dom';

const ProtectedNav = () => {
    const {user} = useAuth();
    const [dropDown, setDropDown] = useState(false);
    // Toggle dropdown:
    const toggleDropDown = () => {
        setDropDown(!dropDown);
    }
  return (
    <nav>
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
    </nav>
  )
}

export default ProtectedNav