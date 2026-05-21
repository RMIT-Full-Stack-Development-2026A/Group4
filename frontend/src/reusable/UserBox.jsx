import { Link } from 'react-router-dom';

export default function UserBox({ username, avatarUrl }) {
    const defaultAvatar = "https://i.pravatar.cc/150"; 

    return (
        <Link to="/profile" className="flex w-full items-center gap-3 bg-[#0a1b4d] p-4 hover:bg-[#0e2466] transition-colors border-t border-white/5">
            
            <div className="w-10 h-10 rounded-full shrink-0 border-2 border-white/20 overflow-hidden bg-slate-700">
                <img 
                    src={avatarUrl || defaultAvatar} 
                    alt="User" 
                    className="h-full w-full object-cover" 
                    onError={(e) => { e.target.src = "https://i.pravatar.cc/150" }}
                />
            </div>

            <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-bold text-white uppercase">
                    {username}
                </div>

            </div>

            
        </Link>
    );
};
