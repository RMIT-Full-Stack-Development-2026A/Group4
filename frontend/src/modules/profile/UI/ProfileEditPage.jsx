import { useEffect } from "react";
import { useAuth } from "../../../context/UserContext"
import { useProfile } from "../hook/useProfile";
import ProfileEdit from "../components/ProfileEdit";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ProfileEditPage = () => {
    const {user} = useAuth();
    const {profile, fetchProfile, loading, error} = useProfile();
    const navigate = useNavigate();

    useEffect(() => {
        if(user) fetchProfile();
    }, [user]);
    
    if (loading || !profile) {
    return <p className="text-center mt-10">Loading...</p>;
    }

    return (
    <div className="flex justify-center mt-10">
      <div className="w-[700px] bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white flex items-center gap-4">

          {/* BACK BUTTON */}
          <button
            onClick={() => navigate("/profile")}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full transition"
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="text-xl font-bold">
            Edit Profile
          </h2>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          {error && <p className="text-red-500 mb-3">{error}</p>}

          <ProfileEdit profile={profile} />
        </div>

      </div>
    </div>
  );
}

export default ProfileEditPage;