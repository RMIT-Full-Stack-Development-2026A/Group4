import { createBrowserRouter } from "react-router-dom";
import AdminService from "../modules/admin/service/AdminService";

// Layout
import RootLayout from "../layout/RootLayout";
import AppLayout from "../layout/AppLayout";
// Components
import Home from "../modules/home/page/Home";
import Login from "../modules/authentication/pages/Login";
import Signup from "../modules/authentication/pages/Signup";
import GameLobby from "../modules/lobby/UI/GameLobby";
import Profile from "../modules/profile/UI/Profile";
import PlayerManagement from "../modules/admin/pages/PlayerManagement";
import Subscription from "../modules/subscription/pages/Subscription";
import StatusView from "../modules/subscription/components/StatusView";
import IndexView from "../modules/subscription/components/IndexView";
import MethodView from "../modules/subscription/components/MethodView";
import DepositWallet from "../modules/subscription/pages/DepositWallet";
import PlanDetails from "../modules/subscription/components/PlanDetails";
import GameSession from "../modules/game/UI/ActiveGame";
import ActiveGame from "../modules/game/UI/ActiveGame";
import GameOver from "../modules/game/UI/GameOver";
import ProfileEditPage from "../modules/profile/UI/ProfileEditPage";
import ProfilePasswordPage from "../modules/profile/UI/ProfilePasswordPage";
import GameHistory from "../modules/profile/UI/GameHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ]
  },

  {
    element: <AppLayout />, 
    children: [
      { path: 'lobby', element: <GameLobby /> },
      { path: 'profile', element: <Profile /> },
      { path: 'profile/edit', element: <ProfileEditPage />},
      { path: 'profile/password', element: <ProfilePasswordPage />},
      { path: 'history', element: <GameHistory />},
      
      { 
        path: 'subscription', 
        element: <Subscription />,
        children: [
            { index: true, element: <IndexView /> },
            { path: 'method', element: <MethodView /> }, 
            { path: 'status', element: <StatusView /> }
        ]
      },
      { path: 'deposit', element: <DepositWallet /> },
      { path: 'admin', element: <PlayerManagement /> },

      { path: 'game/:id', element: <ActiveGame /> },
      { path: 'game/finish/:id', element: <GameOver /> }
    ]
  },
]);

export default router