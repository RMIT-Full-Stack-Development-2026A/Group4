import React from 'react'
import { Link } from 'react-router-dom'
import Logout from '../reusable/Logout'

const DropDownMenu = () => {
  
  return (
    <div className='flex flex-col align-center justify-center'>
        <Link to='/profile'>View Profile</Link>
        <Link to='/history'>View Game History</Link>
        <Link to='/subscription'>View Subscription</Link>
        <Logout />  
    </div>
  )
}

export default DropDownMenu