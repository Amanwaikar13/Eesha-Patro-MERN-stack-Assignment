import React from 'react'
import '../styling/navbar-style.css'

const NavBar = () => {
  return (
    <div className='navbar-container'>
      <header>
        <div className="logo-container">
          <a href="/" className="logo">
          
          </a>
          <h2 className='text-info'>LO<span className='text-warning'>GO</span></h2>
        </div> 
        <ul className="navbar">
          {/* <li><a href="/">Home</a></li> */}
          <li><a href="#about">About Us</a></li>
          <li><a href="#items">Items</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#review">Review</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="header">
          <ul className="header-btn">
            <li><a href="/sign-in" className="signup">Sign Up</a></li>
            <li><a href="/sign-in" className="login">Log In</a></li>
          </ul>
        </div>
      </header>
    </div>
  )
}

export default NavBar;
