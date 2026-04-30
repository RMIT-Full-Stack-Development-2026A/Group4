import React from 'react'
import DropDownMenu from './DropDownMenu';
import { Link } from 'react-router-dom';

const ProtectedNav = () => {
  return (
    <nav>
        <div className='flex align-center justify-between'>
              <Link to='/lobby'>TicTacToang</Link>
              <div className='rounded-lg'>
                <DropDownMenu />
              </div>
        </div>
    </nav>
  )
}

export default ProtectedNav