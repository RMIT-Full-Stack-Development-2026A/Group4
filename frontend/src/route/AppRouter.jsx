import { createBrowserRouter, Outlet } from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element:
        <>
          <Navbar />
          <Outlet />
        </>,
    }
  ]
)

export default router;