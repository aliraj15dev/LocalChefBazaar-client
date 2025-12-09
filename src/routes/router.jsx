import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Meals from "../pages/meals/Meals";
import MealDetails from "../pages/meals/MealDetails";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
        { index: true, Component: Home },
        {path:'login', Component:Login},
        {path:'register', Component:Register},
        {path:'meals', Component:Meals},
        {path:'MealDetails/:id', element:<PrivateRoute><MealDetails/></PrivateRoute>},

    ],
  },
]);
