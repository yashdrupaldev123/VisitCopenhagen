import React from 'react'
import './Logo.css'
import logoImg from "../../assets/images/logo.svg"
import { Link } from 'react-router-dom'
const Logo = () => {
  return (
    <Link to="/" className="site-logo">
        <img src={logoImg} alt="logo-img"/>
    </Link>
  )
}

export default Logo
