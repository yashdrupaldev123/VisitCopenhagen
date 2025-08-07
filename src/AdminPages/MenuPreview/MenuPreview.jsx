import React, { useEffect, useState } from 'react'
import './MenuPreview.css'
import { Link } from 'react-router-dom'


const MenuPreview = ({ menuDataFromBackend, menuTitle, menuData, }) => {

  return (
    <div className='menu-preview'>
      <h3 className="heading text-center">Menu Preview</h3>
      
      {(menuDataFromBackend.menuLinks.length == 1 && menuDataFromBackend.menuLinks[0].title=="") ? <h4>No Links.</h4>

        :
        <>
          <h4 className='menu-title'>{ menuTitle }</h4>
          <ul>
            {
              menuData.map(({title,url}, index) => {
                return <>
                <li key={title}> <Link to={url}>{title}</Link> </li>
                </>
              })
            }
          </ul>
        </>
}
    </div>
  )
}

export default MenuPreview;
