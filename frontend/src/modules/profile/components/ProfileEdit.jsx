import { useState, useEffect } from "react";
import { useProfile } from "../hook/useProfile";
import { useNavigate } from "react-router-dom";

const ProfileEdit = ({ profile }) => {
  const { updateProfile } = useProfile();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    username: "",
    country: "",
  });

  useEffect(() => {
    if (profile) {
      setForm({
        email: profile.account.email || "",
        username: profile.account.username || "",
        country: profile.profile.country || "",
      });
    }
  }, [profile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      await updateProfile(form);  
      setSuccess(true);

      setTimeout(() => {
        navigate("/profile");
      }, 1500);
    } catch (err){
      console.log(err);
    }
  };

  return (
  <>
    {/* SUCCESS MESSAGE */}
    {success && (
      <div className="bg-green-100 text-green-700 p-3 rounded-lg text-center mb-3">
         Profile updated successfully!
      </div>
    )}

    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

      <input
        className="p-3 border rounded-lg"
        value={form.username}
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
        placeholder="Username"
      />

      <input
        className="p-3 border rounded-lg"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
        placeholder="Email"
      />

      <select
        className="p-3 border rounded-lg"
        value={form.country}
        onChange={(e) =>
          setForm({ ...form, country: e.target.value })
        }
      >
        <option value="">Select country</option>
        <option>Vietnam</option>
        <option>Singapore</option>
        <option>Malaysia</option>
        <option>Japan</option>
      </select>

      <button className="bg-red-500 text-white p-3 rounded-lg">
        Save Changes
      </button>

    </form>
  </>
);
};

export default ProfileEdit;