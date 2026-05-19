import { useNavigate } from "react-router-dom";
import { useProfile } from "../hook/useProfile"
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const ProfilePasswordPage = () => {
    const {updateProfile} = useProfile();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        oldPassword: "",
        password : "",
        confirmPassword : ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        //validate
        if(form.password !== form.confirmPassword) {
            setError("Password do not match");
            return;
        }

        try{
            await updateProfile({oldPassword: form.oldPassword, 
                                password: form.password});

            setSuccess(true);
            setError("");

            setTimeout(() => {
                navigate("/profile");
            }, 1500);
        } catch (err){
            setError(err.message || "Failed to update password");
        }
    };

    return (
    <div className="flex justify-center mt-10">
      <div className="w-[600px] bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 p-6 text-white flex items-center gap-4">
          
          <button
            onClick={() => navigate("/profile")}
            className="bg-white/20 hover:bg-white/30 p-2 rounded-full"
          >
            <ArrowLeft size={20} />
          </button>

          <h2 className="text-xl font-bold">Change Password</h2>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4">

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded">
               {error}
            </div>
          )}

          {success && (
            <div className="bg-green-100 text-green-600 p-3 rounded">
               Password updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            <input
                type="password"
                placeholder="Current Password"
                className="p-3 border rounded-lg"
                value={form.oldPassword}
                onChange={(e) => {
                    setForm({ ...form, oldPassword: e.target.value });
                    setError("");
                }}
            />

            <input
              type="password"
              placeholder="New Password"
              className="p-3 border rounded-lg"
              value={form.password}
              onChange={(e) => {
                setForm({ ...form, password: e.target.value })
                setError("");
              }}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 border rounded-lg"
              value={form.confirmPassword}
              onChange={(e) => {
                setForm({ ...form, confirmPassword: e.target.value });
                setError("");
              }}
            />

            <button
                disabled={success}
                className={`p-3 rounded-lg text-white ${
                    success ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
                }`}
                >
                {success ? "Updated!" : "Update Password"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePasswordPage;