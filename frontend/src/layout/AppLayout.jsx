import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/UserContext';
import SideBar from './components/SideBar';

export default function AppLayout() {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Wait for security check
    if (loading) return <div className='p-10 font-bold text-center uppercase tracking-widest'>Authenticating...</div>;

    // If not authenticated, user is redirected to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // check if we are in a game session
    const isMidGame = location.pathname.includes('/game/');

    return (
        <div className='flex flex-row h-screen overflow-hidden bg-white'>
            {!isMidGame && <SideBar />}
            
            <main className='flex-1 overflow-y-auto p-3'>
              <Outlet/>
            </main>

        </div>
    );
};