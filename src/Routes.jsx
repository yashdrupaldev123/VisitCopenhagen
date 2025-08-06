import React from 'react'
import App from './App';
import Login from './Pages/Login/Login';
import Homepage from './Pages/Homepage/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import SearchResultPage from './Pages/SearchResultPage/SearchResultPage';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import UserAccountPage from './AdminPages/UserAccountPage/UserAccountPage';
import MenuUpdate from './AdminPages/MenuUpdate/MenuUpdate';
import axios from 'axios';
const Routes = ({ children }) => {
  let routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Homepage />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/search',
          element: <SearchResultPage />,
        },
        {
          path: '/admin',
          element: <AdminDashboard />,
          children: [
            {
              index: true,
              element: <UserAccountPage />,
            },
            {
              path: 'dashboard',
              element: <AdminDashboard />,
            },
            {
              path: 'main-navigation-top/edit',
              element: <MenuUpdate menuTitle="Main Navigation Top" />,
              loader: async () => {
                let response = await axios.get(`http://localhost:5000/api/admin/menu?menuTitle=My+Account`);
                return response.data;
              },
            },
            {
              path: 'main-navigation-bottom/edit',
              element: <MenuUpdate menuTitle="Main Navigation Bottom" />,
              loader: async () => {
                let response = await axios.get(`http://localhost:5000/api/admin/menu?menuTitle=Main+Navigation+Bottom`);
                return response.data;
              },
            },
          ]
        }
      ]
    }
  ]);
  return (
    <RouterProvider router={routes}>
      {children}
    </RouterProvider>
  )
}

export default Routes
