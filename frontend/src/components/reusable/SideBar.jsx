import { useAuth } from "../../context/UserContext";
import Logo from "./Logo";
import SideBarNav from "./SideBarNav";
import UserBox from "./UserBox";
import Logout from "./Logout";

const SideBar = () => {
    const { user } = useAuth();

    return (
        <aside className="w-[260px] h-screen shrink-0 flex flex-col border-r border-gray-300 font-baloo overflow-hidden">
            
            <div className="bg-[#00a651] p-6 shrink-0 border-b border-[#008f45] flex justify-center items-center">
                <Logo />
            </div>

            <div className="bg-[#cd5253] flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">
                    <SideBarNav role={user?.role} />
                </div>
                
                <div className="p-4 border-t border-white/10">
                    <Logout />
                </div>
            </div>

            <div className="shrink-0">
                <UserBox 
                    username={user?.username} 
                    avatarUrl={user?.avatarUrl} 
                />
            </div>
        </aside>
    );
};

export default SideBar;