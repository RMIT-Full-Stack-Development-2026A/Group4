import { Sword, LayoutDashboard, Gamepad, Edit, User, ClipboardCheck, History, ShieldAlert, Home, Wallet } from "lucide-react";

const NavConfig = {
    "PLAYER": [
        { type: "link", text: "HOME", to: "/lobby", icon: Home },
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
        {
            type: "section",
            label: "STORE",
            links: [
                { to: "/subscription", text: "PREMIUM PLAN", icon: ClipboardCheck },
                { to: "/deposit", text: "DEPOSIT WALLET", icon: Wallet }
            ]
        }
    ],
    "ADMIN": [
        { 
            type: "section",
            label: "ADMIN FUNCTIONS",
            links: [
                { to: "/admin", text: "PLAYER MANAGEMENT", icon: ShieldAlert }
            ],
        },
    ]
};

export default NavConfig;