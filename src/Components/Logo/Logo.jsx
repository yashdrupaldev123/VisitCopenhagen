import React from 'react'
import './Logo.css'
import logoImg from "../../assets/images/logo.svg"
import { Link, useLocation } from 'react-router-dom'
const Logo = () => {
  let location = useLocation()
  return (
    <Link to={location.pathname.includes("admin") ? "/admin/dashboard" : "/"} className="site-logo">
        <img src={logoImg} alt="logo-img"/>
    </Link>
  )
}

export default Logo
