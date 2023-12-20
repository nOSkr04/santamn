import React from "react"
import { Navigate } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

// Users
import User from "../pages/User/index"
import Gift from "pages/Gift"
import CreateGift from "pages/Gift/create-gift"

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },
  // product
  { path: "/user", component: <User /> },

  // //profile
  { path: "/profile", component: <UserProfile /> },
  { path: "/gift", component: <Gift /> },
  { path: "/add-gift", component: <CreateGift /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
]

const publicRoutes = [
  { path: "/login", component: <Login /> },
  { path: "/logout", component: <Logout /> },
]

export { authProtectedRoutes, publicRoutes }
