import React from 'react'
import PublicNavBar from '../reusable/NavBar'
import { useAuth } from '../../context/UserContext'
import ProtectedNav from '../reusable/ProtectedNav'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  const {user} = useAuth();
  return (
    <div className='m-10'>
        { user ? <ProtectedNav/> : <PublicNavBar />}
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout