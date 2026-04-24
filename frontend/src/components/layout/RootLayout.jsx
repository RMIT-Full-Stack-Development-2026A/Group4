import React from 'react'
import PublicNavBar from './NavBar'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div>
        <PublicNavBar />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default RootLayout