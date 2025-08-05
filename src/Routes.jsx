import React from 'react'
import App from './App';
import Login from './Pages/Login/Login';
import Homepage from './Pages/Homepage/Homepage'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import ErrorPage from './Pages/ErrorPage/ErrorPage';
import SearchResultPage from './Pages/SearchResultPage/SearchResultPage';
const Routes = ({children}) => {
    let routes = createBrowserRouter([
    {
      path: '/',
      element: <App/>,
      errorElement: <ErrorPage/>,
      children: [
        {
                index: true,
                element: <Homepage/>,
        },
           {
                path: '/login',
                element: <Login/>,
        },
        {
                path: '/search',
                element: <SearchResultPage/>,
        }
      ] 
    }
   ]);
  return (
    <RouterProvider router={routes}>
        { children }
    </RouterProvider>
  )
}

export default Routes
