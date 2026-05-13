import { useState } from "react";
import { useAuth } from "../../../context/UserContext"
import { useProfile } from "../hook/useProfile";

const ProfileEdit = ({profile}) => {
  const {token} = useAuth();
  const {updateProfile} = useProfile(token);

  const [form, setForm] = useState({
    email: profile?.account?.email || "",
    username: profile?.account?.username || "",
    country: profile?.profile?.country || "",
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await updateProfile(form);
    alert('Updated!');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      
      <div className="p-2 flex flex-col">
        <label className="text-gray-600">Username</label>
        <input className=" border broder-gray-600 p-2 rounded-lg " name="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />
      </div>

      <div className="p-2 flex flex-col">
        <label className="text-gray-600">Email</label>
        <input className="border broder-gray-600 p-2 rounded-lg" name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
      </div>

      <div className="p-3 flex flex-col ">
        <select className="p-3 cursor-pointer" name="country" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})}>
          <option value="">Select your country</option>
          <option value="Vietnam">Vietnam</option>
          <option value="Singapore">Singapore</option>
          <option value="Malaysia">Malaysia</option>
          <option value="Japan">Japan</option>
        </select>
      </div>
      
      <button onClick={()=>{}} className="bg-green-500 cursor-pointer text-white p-2 rounded">
        Save
      </button>

    </form>
  )
}

export default ProfileEdit;