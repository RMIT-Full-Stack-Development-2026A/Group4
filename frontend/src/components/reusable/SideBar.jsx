import React, { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { Check, CircleCheck, Clipboard, ClipboardCheck, Edit, Gamepad, History, LayoutDashboard, Receipt, ReceiptCent, Sword, User } from 'lucide-react'
import Logout from './Logout'
import NavConfig from '../../config/NavConfig'
import { useAuth } from '../../context/UserContext'

const SideBar = () => {
  // State 
  const {user} = useAuth();
  const [navSection, setNavSection] = useState(NavConfig["PLAYER"]);
  console.log(navSection)

  return (
    <div className='flex  flex-col gap-3 rounded-lg p-4 shadow-[0px_0px_6px_1px_rgba(0,_0,_0,_0.1)]'>
      <h1 className='text-2xl font-bold text-gray-900'>TIC TAC TOANG</h1>
      
      <nav>
        {
          navSection.map((section)=>(
              <div className='flex flex-col p-4 border rounded border-gray-100'>
                <h2 className='font-semibold text-gray-800'>{section.label}</h2>
                {section.links.map((link)=>{
                  const CurrentIcon = link.icon
                  return (
                  <Link className='flex align-middle gap-2 p-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg' to={link.to}>
                    <CurrentIcon />
                    <span>{link.text}</span>
                  </Link>)
                })}
              </div>
          ))
        }
        
      </nav>

      <Logout />
    </div>  
  )
}

export default SideBar