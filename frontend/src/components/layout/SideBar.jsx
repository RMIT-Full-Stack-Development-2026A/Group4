import  Logo  from "../reusable/Logo";
import  CollapsibleBox  from "../reusable/CollapsibleBox";
import UserBox from "./UserBox";
import { Link } from "react-router-dom";
import SideBarNav from "./SideBarNav";

const SideBar = ({}) => {
    return (
        <div className="w-[18vw] min-w-50 max-w-75 h-dvh shrink-0 flex flex-col 
                        border-r border-gray-300 font-baloo">
        
            {/* Logo */}
            <div className="bg-[#00a651] p-4 shrink-0 border-b border-[#008f45]">
                <Logo size="medium" />
            </div>

            <div className="bg-[#cd5253] flex-1 flex flex-col min-h-0">
                
                {/* Navigation */}
                <SideBarNav />

                {/* Sign Out Button */}
                <button className="p-4 shrink-0 w-full text-center text-white font-bold 
                                   hover:underline transition-all">
                    Sign out
                </button>
            </div>

            <div className="shrink-0">
                {/* Pass actual data here */}
                <UserBox username="Username" avatarUrl="" />
            </div>

        </div>
    );
};

export default SideBar