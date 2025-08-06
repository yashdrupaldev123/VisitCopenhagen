import React, { useEffect, useState } from 'react'
import './MenuPreview.css'


const MenuPreview = ({menuTitle,menuData}) => {

  return (
    <div className='menu-preview'>
      <h3 className="heading text-center">Menu Preview</h3>
      { !menuData ? <h4>No Links Available in {menuTitle} Menu. Add links.</h4> 
        : menuData.menuLinks.map((item) => {
                <p>{item.title}</p>
        })
}
    </div>
  )
}

export default MenuPreview;
