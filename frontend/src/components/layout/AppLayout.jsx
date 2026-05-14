import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/UserContext';

export default function AppLayout() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div className='p-10 font-bold text-center'>Authenticating...</div>;
    }

    // If there is no user, redirect them to the landing page (Root)
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // If the user IS logged in, allow them to see the page
    return <Outlet />;
};