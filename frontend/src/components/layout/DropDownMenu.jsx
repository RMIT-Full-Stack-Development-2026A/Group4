import React from 'react'
import { Link } from 'react-router-dom'

const DropDownMenu = () => {
  return (
    <div>
        <Link to='/profile'>View Profile</Link>
        <Link to='/history'>View Game History</Link>
        <Link to='/subscription'>View Subscription</Link>
        <Link to='/setting'>Setting</Link>
    </div>
  )
}

export default DropDownMenu