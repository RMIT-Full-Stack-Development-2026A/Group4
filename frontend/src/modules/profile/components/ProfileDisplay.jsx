
const ProfileDisplay = ({profile}) => {
  if(!profile) return null;

  return (
    <div className="flex flex-col gap-2">
      <p><b>Email:</b> {profile.account.email}</p>
      <p><b>Username:</b> {profile.account.username}</p>
      <p><b>Country:</b> {profile.account.country}</p>
      <p><b>Wallet:</b> {profile.account.wallet_balance}</p>
      <p><b>Premium:</b> {profile.profile.isPremium ? "Yes" : "No"}</p>
    </div>
  );
};

export default ProfileDisplay;