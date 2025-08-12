import React, { lazy, Suspense } from 'react'
import App from './App';
import Login from './Pages/AuthForm/AuthForm';
import Homepage from './Pages/Homepage/Homepage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import SearchResultPage from './Pages/SearchResultPage/SearchResultPage';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard'
import UserAccountPage from './Admin/Pages/UserAccountPage/UserAccountPage';
 
import MenuUpdate from './Admin/Pages/MenuUpdate/MenuUpdate';
import axios from 'axios';
import { ErrorBoundary } from 'react-error-boundary';
import AuthForm from './Pages/AuthForm/AuthForm';
import BasicSiteSettings from './Admin/Pages/BasicSiteSettings/BasicSiteSettings';
 
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
          element: <AuthForm />,
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
          path: 'basic-site-settings',
          element: <BasicSiteSettings />,
        },
            {
              path: 'main-navigation-top/edit',
              
              element:
        <MenuUpdate menuTitle="Main Navigation Top" />,
              loader: async () => {
                let menuGetResponse = getMenuData("Main Navigation Top");
                return menuGetResponse;
              },
              errorElement: <ErrorPage/>
            },
            {
              path: 'main-navigation-bottom/edit',
              element: <MenuUpdate menuTitle="Main Navigation Bottom" />,
              loader: async () => {
                let menuGetResponse = getMenuData("Main Navigation Bottom");
                return menuGetResponse;
              },
              
              errorElement: <ErrorPage/>
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
 