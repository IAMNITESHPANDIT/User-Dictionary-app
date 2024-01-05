import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/profile/Profile'
import Users from '../pages/users/Users'

function RoutesPath() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/userDetails/:id" element={<Profile/>} />
      </Routes>  
    </div>
  )
}

export default RoutesPath