import { Sword, LayoutDashboard, Gamepad, Edit, User, ClipboardCheck, History, ShieldAlert, Home } from "lucide-react";

const NavConfig = {
    "PLAYER": [
        { type: "link", text: "HOME", to: "/", icon: Home },
        {
            type: "section",
            label: "GAME",
            links: [
                { to: "/lobby", text: "START NEW GAME", icon: Sword },
                { to: "/history", text: "MATCH HISTORY", icon: Gamepad },
            ]
        },
        {
            type: "section",
            label: "PROFILE",
            links: [
                { to: "/profile", text: "VIEW INFO", icon: User },
                { to: "/profile/edit", text: "EDIT PROFILE", icon: Edit },
            ]
        },
        { type: "link", text: "PLANS", to: "/subscription", icon: ClipboardCheck }
    ],
    "ADMIN": [
        { 
            type: "section",
            label: "ADMIN FUNCTIONS",
            links: [
                { to: "/app/admin", text: "PLAYER MANAGEMENT", icon: ShieldAlert }
            ],
        },
    ]
};

export default NavConfig;