import React, { useEffect, useState } from 'react'
import MenuPreview from '../MenuPreview/MenuPreview'
import { useLoaderData } from 'react-router-dom'
import './MenuUpdate.css'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const MenuUpdate = ({ menuTitle }) => {
  let menuData = useLoaderData().data;

  let [menuLinks, setMenuLinks] = useState([
    {
      title: '',
      url: '',
      subMenu: [],
      hasSubMenu: false
    }
  ]);


useEffect(() => {
  console.log("Menu Links: ", menuLinks);
},[menuLinks]);


  let [menuLabel, setMenuLabel] = useState(menuData.menuLabel);

  useEffect(() => {

    async function createMenuIfNotExist() {
      if (menuData.length == 0) {
        try {
          let res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/menu/add`, {
            menuKey: menuTitle,
            menuLabel: menuTitle
          });
          console.log(res.data)
       
        }
        catch (error) {
          console.log("Error while creating menu: " + error.message);
        }
      }
      else {
        if (menuData.menuLinks.length != 0) {
          setMenuLinks(menuData.menuLinks);
        }
      }
    }
    createMenuIfNotExist();
  }, [menuTitle, menuData])


  const addLink = (e) => {
    e.preventDefault();
    setMenuLinks([
      ...menuLinks,
      {
        title: '',
        url: '',
        subMenu: []
      }
    ]);
  };

  const addSubMenu = (e, linkIndex) => {
    e.preventDefault();
    let updatedLinks = [...menuLinks];
    if (!updatedLinks[linkIndex].subMenu) updatedLinks[linkIndex].subMenu = [];
    updatedLinks[linkIndex].subMenu.push({ title: '', url: '' });
    updatedLinks[linkIndex].hasSubMenu = false;
    setMenuLinks(updatedLinks);
  };

  const setSubMenu = (linkIndex, subIndex, key, value) => {
    let updatedLinks = [...menuLinks];
    updatedLinks[linkIndex].subMenu[subIndex][key] = value;
    // If there is at least one submenu, ensure hasSubMenu is true
    updatedLinks[linkIndex].hasSubMenu = (updatedLinks[linkIndex].subMenu && updatedLinks[linkIndex].subMenu.length > 0);
    setMenuLinks(updatedLinks);
  };

  const deleteSubMenu = (e, linkIndex, subIndex) => {
    e.preventDefault();
    let updatedLinks = [...menuLinks];
    updatedLinks[linkIndex].subMenu = updatedLinks[linkIndex].subMenu.filter((_, idx) => idx !== subIndex);
    updatedLinks[linkIndex].hasSubMenu = updatedLinks[linkIndex].subMenu.length > 0;
    setMenuLinks(updatedLinks);
  };

  const setLink = (index, key, value) => {
    let updatedLinks = [...menuLinks];
    updatedLinks[index][key] = value;
    setMenuLinks(updatedLinks);
  };

  const deleteLink = (e, linkIndex) => {
    e.preventDefault();
    const updatedLinks = menuLinks.filter((_, index) => index !== linkIndex);
    setMenuLinks(updatedLinks);
  };

  const menuUpdateNotification = () => {
    toast.success('Menu Updated Successfully.', {
  icon: '✅',
});
};

  const submitHandler = async(e) => {
    e.preventDefault()
    console.log("Submitting Menu Data: ", menuLinks);
    let submittedMenuData = {
      menuKey: menuTitle,
      menuLabel: menuLabel,
      menuLinks: menuLinks,
    };

    console.log("Submitted Menu Data: ", submittedMenuData);
        try{
    let response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/menu/edit`,submittedMenuData);
    if(response.data.status == "Success")
        menuUpdateNotification();
    }catch(error){
      console.log("Error while updating menu: "+error.message)
    }
    }

  return (
    <>
      <div className="menu-update-page">
        <h2 className='page-title'>Add Link For {menuTitle} Menu</h2>
        <div className="menu-update-and-preview">
          <form onSubmit={(e) => { submitHandler(e) }}>
            <div className="form-group">
              <label htmlFor="menuLabel">Menu Label</label>
              <input type="text" id="menuLabel" name="menuLabel" onChange={(e) => { setMenuLabel(e.target.value) }} value={menuLabel} />
            </div>
            <fieldset className="menu-links-fieldset">
              <legend>Menu Links</legend>
              {
                menuLinks.map((item, index) => {
                  return (
                    <fieldset key={index} style={{ marginBottom: '1em' }}>
                      <div className="menu-link-item">
                        <div>
                          <label htmlFor="title">Title</label>
                          <input type="text" value={item.title} placeholder="Add Link Title" onChange={((e) => { setLink(index, 'title', e.target.value) })} />
                        </div>
                        <div>
                          <label htmlFor="title">Url</label>
                          <input type="text" value={item.url} placeholder="Add Link Url" onChange={((e) => { setLink(index, 'url', e.target.value) })} />
                        </div>
                      </div>
                      {(menuLinks.length > 1) && <button className="delete-btn" onClick={(e) => { deleteLink(e, index) }}>Delete</button>}
                      {/* Submenu Section */}
                      <div className="submenu-section" style={{ marginTop: '0.5em', marginLeft: '1em' }}>
                        <label style={{ fontWeight: 'bold' }}>Submenus:</label>
                        {item.subMenu && item.subMenu.length > 0 && item.subMenu.map((sub, subIdx) => (
                          <div key={subIdx} className="submenu-item" style={{ display: 'flex', gap: '0.5em', alignItems: 'center', marginBottom: '0.5em' }}>
                            <input
                              type="text"
                              value={sub.title}
                              placeholder="Submenu Title"
                              onChange={e => setSubMenu(index, subIdx, 'title', e.target.value)}
                            />
                            <input
                              type="text"
                              value={sub.url}
                              placeholder="Submenu Url"
                              onChange={e => setSubMenu(index, subIdx, 'url', e.target.value)}
                            />
                            <button className="delete-btn" onClick={e => deleteSubMenu(e, index, subIdx)} style={{ fontSize: '0.8em' }}>Delete</button>
                          </div>
                        ))}
                        <button className="add-link-button" onClick={e => addSubMenu(e, index)} style={{ fontSize: '0.9em' }}>+ Add Submenu</button>
                      </div>
                    </fieldset>
                  );
                })
              }
              <button className="add-link-button" onClick={(e) => { addLink(e) }}> + Add Link</button>
            </fieldset>

           
            <button type="submit" className="submit-button">Save</button>

          </form>
          <MenuPreview menuTitle={menuTitle} menuData={menuLinks} menuDataFromBackend ={menuData} />
          <Toaster />
        </div>
      </div>
    </>

  )
}

export default MenuUpdate
