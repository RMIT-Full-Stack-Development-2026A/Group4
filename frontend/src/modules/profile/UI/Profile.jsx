import { useState, useEffect } from 'react'
import { useAuth } from '../../../context/UserContext';
import ProfileDisplay from '../components/ProfileDisplay';
import {Camera, Lock} from 'lucide-react'
import { useProfile } from '../hook/useProfile';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  
  const [preview, setPreview] = useState(null);

  const { user } = useAuth(); 
  const { profile, fetchProfile, loading, error, uploadAvatar } = useProfile();
  const navigate = useNavigate();

  useEffect(() => {
    if(user) fetchProfile();
  }, [user]);

  const handleUpload = (file) => {
    if(!file) return;

    //preview
    setPreview(URL.createObjectURL(file));

    //send to backend
    uploadAvatar(file);
  };

  return (
    <div className="flex justify-center mt-10">
      
      <div className="w-[720px] bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white flex flex-col items-center gap-3 relative">

          {/* Avatar */}
          <div className="relative group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img
                src={
                  preview ||
                  profile?.profile?.avatarUrl ||
                  "https://i.pravatar.cc/150"
                }
                onError={(e) => { e.target.src = "https://i.pravatar.cc/150" }} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Upload button overlay */}
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center cursor-pointer transition rounded-full">
              <Camera className="text-white" size={20} />
              <input
                type="file"
                className="hidden"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </label>
          </div>

          {/* Username */}
          <h1 className="text-2xl font-bold">
            {user?.username}
          </h1>
        </div>

        {/* CONTENT */}
        <div className="p-6">

          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-red-500 text-center">{error}</p>}

          <ProfileDisplay profile={profile} />
    

        </div>

        <button
          onClick={() => navigate("/profile/password")}
          className="
            mt-4 w-full
            bg-gradient-to-r from-red-500 to-indigo-500
            text-white
            px-5 py-3
            rounded-xl
            flex items-center justify-center gap-3
            font-semibold
            shadow-md
            hover:shadow-lg hover:scale-[1.02]
            transition-all duration-300
          "
        >
          <Lock size={18} />
          Change Password
        </button>

      </div>

    </div>
  );
};

export default Profile;