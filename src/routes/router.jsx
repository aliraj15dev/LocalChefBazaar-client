import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
        { index: true, Component: Home },
        {path:'login', Component:Login},
        {path:'register', Component:Register},

    ],
  },
]);
