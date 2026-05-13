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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

    <input
      className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
      name="username"
      value={form.username}
      placeholder="Username"
      onChange={(e)=>setForm({...form, username:e.target.value})}
    />

    <input
      className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
      name="email"
      value={form.email}
      placeholder="Email"
      onChange={(e)=>setForm({...form, email:e.target.value})}
    />

    <select
      className="p-3 border rounded-lg focus:ring-2 focus:ring-red-400"
      value={form.country}
      onChange={(e)=>setForm({...form, country:e.target.value})}
    >
      <option value="">Select country</option>
      <option>Vietnam</option>
      <option>Singapore</option>
      <option>Malaysia</option>
      <option>Japan</option>
    </select>

    <button className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition">
      Save Changes
    </button>

</form>
  )
}

export default ProfileEdit;