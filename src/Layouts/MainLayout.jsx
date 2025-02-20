import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Components/Footer/Footer'
import MyNav from '../Components/Navbar/Navbar.jsx'

export default function MainLayout() {
  return (
    <>
    <MyNav/>
    <div className="container">
        <Outlet />
    </div>
    <Footer/>
    </>
  )
}
