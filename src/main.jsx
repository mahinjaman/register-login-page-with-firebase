import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './components/Root.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import UserProvider from './AuthProvider/UserProvider.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Order from './components/Order.jsx';
import Profile from './components/Profile.jsx';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path:'/order',
        element: 
        <PrivateRoute>
          <Order></Order>
        </PrivateRoute>
      },
      {
        path: "/profile",
        element: 
        <PrivateRoute>
          <Profile></Profile>
        </PrivateRoute>
      }
    ]
  }
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>,
)
