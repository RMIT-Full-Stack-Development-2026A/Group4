// Importing dependencies:
import { createBrowserRouter, Outlet } from "react-router-dom";
// Importing route components:
import Login from "../modules/authentication/Login/components/Login";
import Signup from "../modules/authentication/Signup/components/Signup";
import Home from "../modules/home/page/Home";
import RootLayout from "../components/layout/RootLayout";
import PlayerManagement from "../modules/admin/PlayerManagement";
import GameLobby from "../modules/lobby/GameLobby";
import SubscriptionPage from "../modules/subscription/SubscriptionPage";

// Creating a router:
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home/> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: 'lobby', element: <GameLobby /> },
        { path:'profile', element: <></> },
        { path:'subscription', element: <SubscriptionPage/>},
        { path:'history', element: <></> },
      ]
    },
    {
      path: '/app',
      element: <RootLayout />,
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