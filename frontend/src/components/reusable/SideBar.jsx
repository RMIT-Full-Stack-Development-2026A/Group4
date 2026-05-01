import React from 'react'
import { Link } from 'react-router-dom'
import { Check, CircleCheck, Clipboard, ClipboardCheck, Edit, Gamepad, History, LayoutDashboard, Receipt, ReceiptCent, Sword, User } from 'lucide-react'
import Logout from './Logout'

const SideBar = () => {
  return (
    <div className='flex flex-col  gap-3 rounded-lg p-4 shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)]'>
      <div>
        <h1 className='text-2xl font-bold text-gray-900'>TIC TAC TOANG</h1>
      </div>

      <nav className='flex flex-col gap-2'>
        
        <div className='flex flex-col p-4 border rounded border-gray-100'>
          <h2 className='font-semibold text-gray-800'>GAME</h2>
          <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to='/lobby'><Sword /> START</Link>
          <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to='/statistics'><LayoutDashboard/> STATISTICS</Link>
          <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to='/history'><Gamepad/> HISTORY</Link>
        </div>
        
        <div className='flex flex-col p-4 gap-1 border rounded border-gray-100'>
          <h2 className='font-semibold text-gray-800'>PROFILE</h2>
          <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to='/profile'><User/> INFO</Link>
          <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to='/profile/edit'><Edit/> EDIT</Link>
        </div>
          
          <div className='flex flex-col p-4 border rounded border-gray-100'>
            <h2 className='font-semibold text-gray-800'>SUBSCRIPTION</h2>
            <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to='/subscription'><ClipboardCheck/> PLAN</Link>
            <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to=''><History/> HISTORY</Link>
          </div>

        </nav>
        <Logout />
    </div>  
  )
}

export default SideBar