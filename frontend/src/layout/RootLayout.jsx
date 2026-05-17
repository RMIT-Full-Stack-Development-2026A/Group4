import PublicNavBar from './components/PublicNavBar';
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <div className='flex flex-col h-screen overflow-hidden bg-white'>
        {/* Top Navbar for Public Pages */}
        <div className='shrink-0'>
            <PublicNavBar />
        </div>

        {/* Content area for Home, Login, or Signup */}
        <main className='flex-1 overflow-y-auto'>
            <Outlet/>
        </main>
    </div>
  )
}

export default RootLayout;