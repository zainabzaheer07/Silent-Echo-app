import React from 'react'
import { NavLink } from 'react-router-dom';
import "./Footer.css";
function Footer() {
  return (
    <footer className='footer'>
        <div className="left-section">
            <h3 className='footer-description'>
            This is part of the Silent Echo Project. <br />
            All rights reserved.
            </h3>
            <ul className='footer-links'>
                <li>
                    <NavLink to="/">Home</NavLink>

                </li
                >
                <li style={{width:"2px",height:"15px",backgroundColor:"#06D6A0"}}></li>
                <li>
                    <NavLink to="/user">User</NavLink>
                </li>
            </ul>

        </div>

        <p className='footer-year'>
            2025
        </p>
        <img src="./images/footer-logo.svg" alt="" className='footer-logo-img' />
    </footer>
  )
}

export default Footer