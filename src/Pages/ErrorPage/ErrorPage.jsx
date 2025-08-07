import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';
import './ErrorPage.css'

const ErrorPage = () => {
  const navigate = useNavigate();
    const error = useRouteError();

     let title = "An error occurred";
  let message = "Something went wrong.";


 if (isRouteErrorResponse(error)) {
    // For 404 or 500 from react-router
    title = `Error ${error.status}`;
    message = error.statusText || "Page not found";
  } else if (error?.response?.data?.message) {
    // Axios error format
    message = error.response.data.message;
  } else if (error?.message) {
    message = error.message;
  } else {
    message = JSON.stringify(error, null, 2);
  }

  return (
    <>
        <Header/>
        <div className="notfound-container">
      <div className="notfound-content">
        <h2>{title}</h2>
        <p className="error-message">{ message }</p>
        <button className="notfound-button" onClick={() => navigate('/')}>
          Go Home
        </button>
      </div>
    </div>
      <Footer/>
    </>
  )
}

export default ErrorPage
