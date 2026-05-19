import { Sword, Gamepad, Edit, User, ClipboardCheck, Wallet, ShieldAlert, Home } from "lucide-react";

// Define the base player links once
const PLAYER_BASE = [
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
];

const NavConfig = {
    "PLAYER": [
        ...PLAYER_BASE
    ],
    "ADMIN": [
        ...PLAYER_BASE, // Admin gets everything the player gets
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