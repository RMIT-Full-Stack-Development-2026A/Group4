import { createBrowserRouter, Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/SideBar";
const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <>
          <Sidebar />
          <Outlet />
        </>,
    }
  ]
)

export default router;