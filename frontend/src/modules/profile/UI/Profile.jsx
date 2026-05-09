import React, { useState } from 'react'
import { useAuth } from '../../../context/UserContext';
import { useEffect } from 'react';
import ProfileDisplay from '../components/ProfileDisplay';
import ProfileEdit from '../components/ProfileEdit';
import SideBar from '../../../components/reusable/SideBar';
import {Edit} from 'lucide-react'

const Profile = () => {
  const [edit, setEdit] = useState(false);
  // Getting user information
  const { user } = useAuth();
  // Effect to fetch information once when page loads
  useEffect(()=>{
    // getting the id
    const userId = user.id;
    const fetchProfileInformation = async () => {
      const res = await fetch(``, {
        method: '',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userId)
      })
      const data = await res.json();
      console.log(data);
    }
    fetchProfileInformation();
  }, [])

  return (
    <div className='flex'>
      <div>
        <div>
          <img></img>
          <h1>Welcome back {user.username}!</h1>
          <p></p>
          <button onClick={()=>setEdit(!edit)}><Edit/> Edit Profile Information</button>
        </div>
        <div>
          { edit ? ProfileEdit : ProfileDisplay }
        </div>
      </div>
    </div>
  )
}

export default Profile