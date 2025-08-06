import React, { useRef, useState } from 'react'
import './Menu.css'
import { Link, NavLink, useLocation } from 'react-router-dom'
const Menu = ({menuTitle, menulinks,className,toggle,defaultOpen}) => {
  let location = useLocation();
  let [toggleMenuOpen, setToggleMenuOpen] = useState(true);
  let toggleMenuRef= useRef();

  let toggleMenu = () =>{
    if(toggleMenuOpen)
    {
      setToggleMenuOpen(false)
      toggleMenuRef.current.classList.remove('open')
    }
    else{
      setToggleMenuOpen(true)
      toggleMenuRef.current.classList.add('open')
    }
  }
  return (
    <div className={className ? `menu ${className}`: "menu"}>

      {menuTitle && <p ref={toggleMenuRef} className={(toggle=='true' && defaultOpen == 'true') ? "menu-toggle-btn open" : ((toggle=='true' && !defaultOpen) ? "menu-toggle-btn" : "menu-title") } onClick={(toggle=='true')? toggleMenu : null}><strong>
        { menuTitle }
        </strong>
         {(toggle=='true') && <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M297.4 470.6C309.9 483.1 330.2 483.1 342.7 470.6L534.7 278.6C547.2 266.1 547.2 245.8 534.7 233.3C522.2 220.8 501.9 220.8 489.4 233.3L320 402.7L150.6 233.4C138.1 220.9 117.8 220.9 105.3 233.4C92.8 245.9 92.8 266.2 105.3 278.7L297.3 470.7z"/></svg></span>}
        </p>}


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
