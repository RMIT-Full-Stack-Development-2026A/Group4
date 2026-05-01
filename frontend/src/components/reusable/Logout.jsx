import React from 'react'
import { useAuth } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';
import { LogOutIcon } from 'lucide-react';

const Logout = () => {
    const { updateUserInfo } = useAuth();
    const navigate = useNavigate();
    const logout = async () => {
        try {
            const res = await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            if (!res.ok) {
                throw new Error("Error logging out!")
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
    <button className='p-4 text-gray-700 hover:bg-gray-100 font-semibold border-gray-100 border rounded-lg justify-center items-center cursor-pointer flex gap-2' onClick={logout}><LogOutIcon /> LOG OUT</button>
  )
}

export default Logout