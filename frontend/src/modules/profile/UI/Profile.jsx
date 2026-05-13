import React, { useState } from 'react'
import { useAuth } from '../../../context/UserContext';
import { useEffect } from 'react';
import ProfileDisplay from '../components/ProfileDisplay';
import ProfileEdit from '../components/ProfileEdit';
import SideBar from '../../../components/reusable/SideBar';
import {Edit} from 'lucide-react'
import { useProfile } from '../hook/useProfile';

const Profile = () => {
  const [edit, setEdit] = useState(false);

  const { user } = useAuth(); 
  const {profile, fetchProfile, loading, error} = useProfile();

  useEffect(() => {
    if(user) fetchProfile();
  }, [user]);

  return (
    <div className='flex flex-col w-[600px] shadow-lg text-center rounded-x1 justify-center p-5'>
      <div className='flex justify-evenly p-2'>
        <h1 className='text-2xl font-bold mb-3'>
          Welcome Back {user?.username}
        </h1>
        {loading && <p>Loading...</p>}
        {error && <p className='text-red-500'>{error}</p>}
        <button 
        onClick={() => setEdit(!edit)}
        className='flex items-center gap-2 bg-black text-white px-3 py-2 rounded mb-4'
        >
          <Edit size={16} /> Edit Profile
        </button>
      </div>
      <div>
       {
          edit 
          ? <ProfileEdit profile = {profile} />
          : <ProfileDisplay profile = {profile} />
        }
      </div>
    </div>
  );
};

export default Profile;