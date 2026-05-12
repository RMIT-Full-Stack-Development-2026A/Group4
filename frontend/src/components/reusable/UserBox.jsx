import { Link } from 'react-router-dom';

const UserBox = ({ username, avatarUrl }) => {
    const defaultAvatar = ""; 

    return (
        <Link to="/profile" className="flex w-full items-center gap-3 bg-[#0a1b4d] p-4 hover:bg-[#0e2466] transition-colors border-t border-white/5">
            
            <div className="w-10 h-10 rounded-full shrink-0 border-2 border-white/20 overflow-hidden bg-slate-700">
                <img src={avatarUrl || defaultAvatar} alt="User" className="h-full w-full object-cover" />
            </div>

            <div className="flex-1 min-w-0">
                <div className="truncate text-sm font-bold text-white uppercase">
                    {username}
                </div>
                {/* there will be a link here*/}
                <div className="text-[10px] text-gray-400 font-medium uppercase tracking-wider"> 
                    Click to see Profile 
                </div>
            </div>

        </Link>
    );
};

export default UserBox;