import { createBrowserRouter } from "react-router-dom";
import AdminService from "../modules/admin/service/AdminService";

// Layout
import RootLayout from "../components/layout/RootLayout";
import AppLayout from "../components/layout/AppLayout";

// Components
import Home from "../modules/home/page/Home";
import Login from "../modules/authentication/pages/Login";
import Signup from "../modules/authentication/pages/Signup";
import GameLobby from "../modules/lobby/UI/GameLobby";
import Profile from "../modules/profile/UI/Profile";
import SubscriptionPage from "../modules/subscription/pages/SubscriptionPage";
import PaymentSuccess from "../modules/subscription/components/PaymentSuccess";
import PaymentFailure from "../modules/subscription/components/PaymentFailure";
import PlayerManagement from "../modules/admin/pages/PlayerManagement";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      
      {
        element: <AppLayout />,
        children: [
          { path: 'lobby', element: <GameLobby /> },
          { path: 'profile', element: <Profile /> },
          { path: 'subscription', element: <SubscriptionPage /> },
          { path: 'payment/success', element: <PaymentSuccess /> },
          { path: 'payment/failure', element: <PaymentFailure /> },
          { path: 'admin', element: <PlayerManagement /> }
        ]
      }
    ]
  }
]);

export default router;