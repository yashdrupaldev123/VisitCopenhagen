import React from 'react'
import Sidebar from '../../AdminPageComponents/Sidebar/Sidebar'
import Header from '../../AdminPageComponents/Header/Header'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <section className='admin-dashboard'>
      <Header />
      <div className="admin-content d-flex">
        <Sidebar />
        <Outlet />
      </div>

    </section>
  )
}

export default AdminDashboard
