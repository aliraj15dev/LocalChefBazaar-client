import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/Home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Meals from "../pages/meals/Meals";
import MealDetails from "../pages/meals/MealDetails";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/order/OrderPage";
import MyOrders from "../pages/order/MyOrders";
import DashBoard from "../layouts/DashBoard";

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
        {path:'my-orders', element:<PrivateRoute><MyOrders/></PrivateRoute>},
        {path:'order/:id', element:<PrivateRoute><OrderPage/></PrivateRoute>},


    ],
  },
  {
    path: "dashboard",
    element: <PrivateRoute><DashBoard/></PrivateRoute>,
    children: [
      {path:'dashboard/my-order', Component:MyOrders}


    ],
  }
]);
