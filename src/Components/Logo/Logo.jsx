import React, { useContext, useEffect } from 'react'
import './Logo.css'
import logoImg from "../../assets/images/logo.svg"
import { Link, useLocation } from 'react-router-dom'

import logoImage from "../../assets/images/logo.svg";
import { basicSettingsContext } from '../../App.jsx';
const Logo = () => {
  
  let location = useLocation();
    const basicSettingsContextObj = useContext(basicSettingsContext);
      console.log(basicSettingsContextObj)
    let siteSettings = basicSettingsContextObj.siteSettings;
    console.log("Site Settings in Logo: ", siteSettings);
  return (
    <Link to={location.pathname.includes("admin") ? "/admin/dashboard" : "/"} className="site-logo">
        <img src={siteSettings.siteLogoUrl || logoImage} alt="logo-img"/>
    </Link>
  )
}

export default Logo
