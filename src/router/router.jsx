import { createBrowserRouter, Navigate } from "react-router";
import App from "../App";
import Browse from "../pages/Browse";
import Login from "../pages/Login";
import Signup from "../pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      { index: true, element: <Navigate to="/browse" /> },
      { path: "login", Component: Login },
      { path: "signup", Component: Signup },
      { path: "browse", Component: Browse },
    ],
  },
]);

export default router;
