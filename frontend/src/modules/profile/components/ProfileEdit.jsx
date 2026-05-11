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
      <input name="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />

      <input name="username" value={form.username} onChange={(e) => setForm({...form, username: e.target.value})} />

      <input name="country" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} />

      <button className="bg-green-500 text-white p-2 rounded">
        Save
      </button>
    </form>
  )
}

export default ProfileEdit;