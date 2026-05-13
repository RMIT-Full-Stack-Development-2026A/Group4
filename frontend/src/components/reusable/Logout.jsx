import React from 'react'
import { useAuth } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { httpHelper } from '../../utils/httpHelper';

const Logout = () => {
    const { updateUserInfo } = useAuth();
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const res = await httpHelper.post('/auth/logout');
            
            if (res.status !== 200) {
                throw new Error("Error logging out!");
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            updateUserInfo(null);
            navigate('/');
        }
    }

    return (
        <button 
            className='
                w-full flex items-center justify-center gap-3
                p-4 text-white font-bold
                bg-white/10 border border-white/20 rounded-xl
                hover:bg-white/20 hover:scale-[1.02]
                transition-all duration-300 cursor-pointer
                uppercase tracking-widest text-[10px]' 
            onClick={logout}
        >
            <LogOut size={16} /> 
            <span>Log Out</span>
        </button>
    )
}

export default Logout;