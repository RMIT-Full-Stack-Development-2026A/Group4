import { Link } from "react-router-dom";
import { useAuth } from "../../context/UserContext";
import Logo from "../../reusable/Logo";
import SideBarNav from "./SideBarNav";
import UserBox from "../../reusable/UserBox";
import Logout from "./Logout";

export default function SideBar() {
  const { user } = useAuth();
  return (
      <aside className="w-[260px] h-screen shrink-0 flex flex-col border-r border-gray-300 font-baloo overflow-hidden">

            <div className="bg-[#9b3d3e] p-5 shrink-0 border-b border-[#9b3d3e] flex justify-center items-center">
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

            <Link to="/profile" className="mt-auto block bg-[#0a1b4d] hover:bg-[#0e2466] transition-colors">
                <UserBox 
                    username={user?.username} 
                    avatarUrl={user?.avatarUrl} 
                    className="border-none" // Keeps it flat and flush with the sidebar edges
                />
            </Link>
        </aside>
    );
};
