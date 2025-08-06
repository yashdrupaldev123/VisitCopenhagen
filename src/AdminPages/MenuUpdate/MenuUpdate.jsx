import React from 'react'
import MenuPreview from '../MenuPreview/MenuPreview'
import { useLoaderData } from 'react-router-dom'
import './MenuUpdate.css'

const MenuUpdate = ({menuTitle}) => {
        let menuData = useLoaderData();
        
  return (

   <div className="menu-update-page">
        <h2 className='page-title'>Add Link For {menuTitle} Menu</h2>

        <div className="menu-update-and-preview">
      <form>

        <div className="form-group">
        <label htmlFor="menuTitle">Menu Title</label>
          <input type="text" id="menuTitle" name="menuTitle" value={menuTitle}/>
        </div>

        <fieldset className="menu-links-fieldset">
          <legend>Menu Links</legend>
          <div className="menu-link-item">
            <input type="text" name="menuLinkUrl1" placeholder="URL (e.g., /about)" />
            <input type="text" name="menuLinkTitle1" placeholder="Title (e.g., About Us)" />
          </div>
          <div className="menu-link-item">
            <input type="text" name="menuLinkUrl2" placeholder="URL (e.g., /contact)" />
            <input type="text" name="menuLinkTitle2" placeholder="Title (e.g., Contact)" />
          </div>
          {/* You can add more .menu-link-item divs here for more links */}
        </fieldset>

        <button type="submit" className="submit-button">Save Configuration</button>
      </form>
        <MenuPreview menuTitle={menuTitle} menuData={menuData.data} />
        </div>
      </div>
  )
}

export default MenuUpdate
