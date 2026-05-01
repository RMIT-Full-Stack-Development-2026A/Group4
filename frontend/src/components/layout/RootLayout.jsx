import React from 'react'
import PublicNavBar from '../reusable/NavBar'
import { useAuth } from '../../context/UserContext'
import { Outlet } from 'react-router-dom'
import SideBar from '../reusable/SideBar'

const RootLayout = () => {
  const {user} = useAuth();
  return (
    <div className='m-10 flex flex-col gap-5'>
        <div className=''>{ !user &&  <PublicNavBar />}</div>
        <main className='flex flex-1 relative justify-between m-2'>
            { user && <SideBar /> }
            <div className='flex-1 p-8 overflow-y-auto'>
              <Outlet/>
            </div>
        </main>
    </div>
  )
}

export default RootLayout