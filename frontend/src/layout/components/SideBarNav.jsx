import { Link } from "react-router-dom";
import NavConfig from "../config/NavConfig";
import CollapsibleBox from "./CollapsibleBox";

export default function SideBarNav({ role }) {
    const items = NavConfig[role];

    return (
        <nav className="w-full mt-2 overflow-y-auto flex-1 custom-scrollbar">
            {items.map((item, index) => {
                const Icon = item.icon;

                if (item.type === "link") {
                    return (
                        <Link key={index} to={item.to} className="flex items-center gap-3 p-4 text-white font-bold hover:bg-white/10 transition-all border-b border-white/5">
                            <Icon size={20} />
                            <span>{item.text}</span>
                        </Link>
                    );
                }

                if (item.type === "section") {
                    return (
                        <CollapsibleBox key={index} title={item.label}>
                            {item.links.map((subLink, subIndex) => {
                                const SubIcon = subLink.icon;
                                return (
                                    <Link key={subIndex} to={subLink.to} className="flex items-center gap-3 p-2 text-white/80 hover:bg-white/10 rounded-md text-sm pl-2">
                                        <SubIcon size={16} />
                                        <span>{subLink.text}</span>
                                    </Link>
                                );
                            })}
                        </CollapsibleBox>
                    );
                }
                return null;
            })}
        </nav>
    );
}