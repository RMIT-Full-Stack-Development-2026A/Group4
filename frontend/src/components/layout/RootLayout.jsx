import React from 'react'
import PublicNavBar from './PublicNavBar'
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