import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'
import { useAuth } from '../../context/UserContext'
import { useState } from 'react'
// Importing icon
import { User, Gamepad2, Crown, Sword } from 'lucide-react'

const DropDownMenu = () => {
  const {user} = useAuth();
  const [dropDownVisibility, setDropDownVisibility] = useState('hidden');
  // Toggle dropdown:
  const toggleDropDown = () => {
    if (dropDownVisibility === 'hidden') {
      setDropDownVisibility('block');
    } else {
      setDropDownVisibility('hidden');
    }
  };
  return (
    <div className='cursor-pointer p-2 absolute z-50 bg-white transition-transform duration-300 hover:scale-105 right-9 top-8 shadow-[0px_4px_13px_-3px_rgba(0,_0,_0,_0.1)] '>
        
        <div className='rounded-lg text-xl flex gap-1' onClick={toggleDropDown}>
            <h2 className='p-1 font-medium'>{ user.username }</h2>
        </div>

        <div className={`flex gap-1 text-gray-600 w-50 font-medium ${dropDownVisibility} flex-col rounded-lg`}>
          <Link className='hover:bg-gray-200 hover:text-gray-800 p-2 flex gap-2' to='/lobby'><Sword/> Play</Link>
          <Link className='hover:bg-gray-200 hover:text-gray-800 p-2 flex gap-2' to='/profile'><User/> Profile</Link>
          <Link className='hover:bg-gray-200 hover:text-gray-800 p-2 flex gap-2' to='/history'><Gamepad2/> History</Link>
          <Link className='hover:bg-gray-200 hover:text-gray-800 p-2 flex gap-2' to='/subscription'><Crown/> Subscriptions</Link>
          <Logout />  
        </div>

    </div>
  )
}

export default DropDownMenu