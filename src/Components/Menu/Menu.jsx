import React from 'react'
import './Menu.css'
import { Link, NavLink, useLocation } from 'react-router-dom'
const Menu = ({menuTitle, menulinks,className}) => {
  let location = useLocation();

  return (
    <div className={`menu ${className}`}>
      {menuTitle && <p><strong>{ menuTitle }</strong></p>}
      <ul>
        {
                menulinks.map(({url,title,active},index)=>{
                        
                        return <li key={index} className={(active && location.pathname=='/') ? 'active-link' : 'non-active'}><NavLink to={ url } className="menu-hover">{ title }</NavLink></li>
                })
        }
      </ul>
    </div>
  )
}

export default Menu
