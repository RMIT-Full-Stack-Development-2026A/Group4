import { Link } from 'react-router-dom';
// need link update
import defaultAvatar from ''

export default function UserBox({username, avatarUrl}) {
    return (
        <Link to="/profile" 
              className="flex w-full items-center gap-3 bg-[#0a1b4d] p-4">
            
            <div className="w-[25%] max-w-12 aspect-square shrink-0 rounded-full border-2 border-white/20 bg-slate-700">
                <img src={avatarUrl || defaultAvatar} 
                     alt="Profile-Img" 
                     className="h-full w-full object-cover" 
                />
            </div>

            <div className="flex-1 min-w-0 flex-col">
                <div className="truncate text-base font-bold text-white">
                    {username}
                </div>
                <div className="text-[10px] tracking-wider text-gray-300"> 
                    Click to see Profile 
                </div>
            </div>
        </Link>
    )  
}