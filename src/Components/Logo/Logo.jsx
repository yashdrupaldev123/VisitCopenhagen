import React, { useContext, useEffect } from 'react'
import './Logo.css'
import logoImg from "../../assets/images/logo.svg"
import { Link, useLocation } from 'react-router-dom'

import logoImage from "../../assets/images/logo.svg";
import { basicSettingsContext } from '../../App.jsx';
const Logo = () => {
  
  let location = useLocation();
    const context = useContext(basicSettingsContext);
    const siteSettings = context?.siteSettings || {};
    const siteLogo = siteSettings.siteLogo || logoImage;
    console.log("Site Logo:", siteSettings);

  return (

    <Link to={location.pathname.includes("admin") ? "/admin/dashboard" : "/"} className="site-logo">
        <img src={siteLogo} alt="logo-img"/>
    </Link>
  )
}

export default Logo
