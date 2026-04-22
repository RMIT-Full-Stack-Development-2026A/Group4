import React from 'react'
import { Link } from 'react-router-dom'

const PublicNavBar = () => {
  return (
    <div className='flex'>
        <div>
            <img></img>
            <Link to='/'>Home</Link>
        </div>
        <div className='flex gap-1'>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
        </div>
    </div>
  )
}

export default PublicNavBar