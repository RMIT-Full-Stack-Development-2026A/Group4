const ProfileDisplay = ({ profile }) => {
  if (!profile) return null;

  return (
    <div className="grid grid-cols-2 gap-4 text-gray-700">

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-xs text-gray-400">EMAIL</p>
        <p className="font-semibold">{profile.account.email}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-xs text-gray-400">USERNAME</p>
        <p className="font-semibold">{profile.account.username}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-xs text-gray-400">COUNTRY</p>
        <p className="font-semibold">{profile.profile.country}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
        <p className="text-xs text-gray-400">WALLET</p>
        <p className="font-semibold">${profile.profile.wallet_balance || 0}</p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg shadow-sm col-span-2">
        <p className="text-xs text-gray-400">PREMIUM</p>
        <p className={`font-semibold ${profile.profile.isPremium ? "text-green-600" : "text-gray-500"}`}>
          {profile.profile.isPremium ? "Premium User" : "Free User"}
        </p>
      </div>

    </div>
  );
};

export default ProfileDisplay;