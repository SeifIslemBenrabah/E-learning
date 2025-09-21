import React from 'react'
import Navbaradmin from './Navbaradmin'
import { Outlet } from 'react-router-dom'
const Admin = () => {
  return (
    <div>
      <Navbaradmin/>
      <Outlet/>
    </div>
  )
}

export default Admin
