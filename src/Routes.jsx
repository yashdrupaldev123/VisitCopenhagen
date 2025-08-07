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
import { ErrorBoundary } from 'react-error-boundary';

const Routes = ({ children }) => {

  const getMenuData = async(menuKey) =>{
        const apiUrl = `http://localhost:5000/api/admin/menu?menuKey=${menuKey}`;
        const response = await axios.get(apiUrl);
        return response.data;
  }


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
              element: <UserAccountPage />,
            },
            {
              path: 'main-navigation-top/edit',
              
              element: <ErrorBoundary
      FallbackComponent={ErrorPage}>
        <MenuUpdate menuTitle="Main Navigation Top" /></ErrorBoundary>,
              loader: async () => {
                let menuGetResponse = getMenuData("Main Navigation Top");
                return menuGetResponse;
              },
            },
            {
              path: 'main-navigation-bottom/edit',
              element: <MenuUpdate menuTitle="Main Navigation Bottom" />,
              loader: async () => {
                let menuGetResponse = getMenuData("Main Navigation Bottom");
                return menuGetResponse;
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
