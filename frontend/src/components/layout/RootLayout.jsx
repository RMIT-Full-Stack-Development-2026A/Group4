import PublicNavBar from '../reusable/PublicNavBar'
import { useAuth } from '../../context/UserContext'
import { Outlet } from 'react-router-dom'
import SideBar from '../reusable/SideBar'

const RootLayout = () => {
  const { user } = useAuth();

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
        <div className='shrink-0'>{ !user && <PublicNavBar /> }</div>
        <main className='flex flex-1 min-h-0 relative'>
            { user && <SideBar /> }
            
            <div className='flex-1 p-8 overflow-y-auto'>
              <Outlet/>
            </div>
        </main>
    </div>
  )
}

export default RootLayout;
