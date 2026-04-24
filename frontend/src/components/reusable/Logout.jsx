import React from 'react'
import { useAuth } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom';

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
    <div>
        <button onClick={logout}>Log out</button>
    </div>
  )
}

export default Logout