import React from 'react'
import PublicNavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='m-10'>
        <PublicNavBar />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout