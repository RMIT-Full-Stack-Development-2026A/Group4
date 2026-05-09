import { Sword, LayoutDashboard, Gamepad, Edit, User, ClipboardCheck, History } from "lucide-react";

const NavConfig = {
    "PLAYER": [
        {
            label: 'GAME',
            links: [
                { to: '/lobby', text:'START', icon: Sword },
                { to: '/statistics', text:'STATISTICS', icon: LayoutDashboard },
                { to: '/history', text:'HISTORY', icon: Gamepad },
            ]
        },
        {
            label: 'PROFILE',
            links: [
                { to: '/profile', text: 'VIEW INFO', icon: User  },
                { to: '/profile/edit', text:'EDIT', icon: Edit  },
            ]
        },
        {
            label: 'SUBSCRIPTION',
            links: [
                { to: '/subscription', text:'PLANS', icon:ClipboardCheck },
                { to: '/subscription/history', text:'HISTORY', icon: History},
            ]
        }
    ],
    "ADMIN": [
        { 
            label: "section",
            links: [],
        },
    ]
}

export default NavConfig