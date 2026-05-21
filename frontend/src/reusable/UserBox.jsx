export default function UserBox({ username, avatarUrl, marker, isBlue = false, className = "" }) {
    const defaultAvatar = "https://i.pravatar.cc/150"; 

    return (
        <div className={`flex w-full items-center gap-3 p-4 border-t border-white/5 ${className}`}>
            
            <div className="w-10 h-10 rounded-full shrink-0 border-2 border-white/20 overflow-hidden bg-slate-700">
                <img 
                    src={avatarUrl || defaultAvatar} 
                    alt="User" 
                    className="h-full w-full object-cover" 
                    onError={(e) => { e.target.src = defaultAvatar }}
                />
            </div>

            <div className="truncate text-sm font-bold text-white uppercase">
                {username}
            </div>

            {marker && (
                <div className={`
                    w-10 h-10 flex items-center justify-center rounded-xl font-black text-xl border-2
                    ${isBlue ? 'text-blue-400 border-blue-400/30' : 'text-red-400 border-red-400/30'}
                    bg-white/5 shadow-inner
                `}>
                    {marker}
                </div>
            )}
        </div>
    );
};