import React from 'react'
import './Navbar.css'
import logo from'../../assets/logo.png'
import navProfile from'../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
      
      <img src={logo} alt="" className="nav-logo" />
      <div className='together'>
      <div className='head_1'>WEARKIND</div>
      <div className='admin1'>Admin Panel</div>
      </div>
      <img src={navProfile} className='nav-profile'alt="" />
    </div>
  )
}

export default Navbar
