// Importing dependencies:
import { createBrowserRouter, Outlet } from "react-router-dom";
// Importing route components:
import SideBar from "../components/layout/SideBar";
import Login from "../modules/authentication/Login/components/Login";
import Signup from "../modules/authentication/Signup/components/Signup";
import Home from "../modules/home/component/Home";
import RootLayout from "../components/layout/RootLayout";
import AppLayout from "../components/layout/AppLayout";
import PlayerManagement from "../modules/admin/PlayerManagement";
import GameLobby from "../modules/lobby/GameLobby";

// Creating a router:
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home/>
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'lobby',
          element: <GameLobby />
        },
        {
          path:'profile',
          element: <></>
        },
        {
          path:'subscription',
          element: <></>
        },
        {
          path:'history',
          element: <></>
        },
      ]
    },
    {
      path: '/app',
      element: <AppLayout />, 
      children: [ // Hung: Maybe the index should be the game?
        {
          path: 'admin',
          element: <PlayerManagement />
        }
      ]
    }
  ]
)

export default router;