import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from '../../Components/Footer/Footer'
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css'

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <>
        <Header/>
        <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Oops! The page you’re looking for doesn’t exist.</p>
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
