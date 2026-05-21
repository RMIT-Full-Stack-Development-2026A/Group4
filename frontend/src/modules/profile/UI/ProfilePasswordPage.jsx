import { useNavigate } from "react-router-dom";
import { usePasswordUpdate } from "../hook/usePasswordUpdate";
import { ArrowLeft } from "lucide-react";

const ProfilePasswordPage = () => {
    const navigate = useNavigate();
    const { form, error, success, loading, changePassword, updateField } = usePasswordUpdate();

    return (
    <div className="flex justify-center mt-10">
      <div className="w-[600px] bg-white shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-linear-to-r from-red-500 to-pink-500 p-6 text-white flex items-center gap-4">
          
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

          <form onSubmit={changePassword} className="flex flex-col gap-4">

            <input
                type="password"
                placeholder="Current Password"
                className="p-3 border rounded-lg"
                value={form.oldPassword}
                onChange={(e) => updateField('oldPassword', e.target.value)}
            />

            <input
              type="password"
              placeholder="New Password"
              className="p-3 border rounded-lg"
              value={form.password}
              onChange={(e) => updateField('password', e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="p-3 border rounded-lg"
              value={form.confirmPassword}
              onChange={(e) => updateField('confirmPassword', e.target.value)}
            />

            <button
                disabled={success}
                className={`p-3 rounded-lg text-white ${
                    success ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"}`}
                >
                {loading ? "Updating..." : success ? "Updated!" : "Update Password"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePasswordPage;