import React from 'react'
import styles from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';
function Navbar() {
  return (
    <nav className={styles.navbarContainer}>

  <NavLink to="/">  <figure className={styles.companyLogoContainer}>
      <img src="./icons/silent-echo.svg" alt="Company logo" />
    </figure></NavLink>
{/* input container box */}
    <div className={styles.searchContainer} >
      <img src="./icons/search.svg" alt=""  />
    <input type="text" placeholder='Search' />
    </div>
    {/* navigation links */}
    <ul className={styles.navigationList}>
      <li>

    <NavLink to="/">Home</NavLink>
      </li>
      <li>
<NavLink to="/conversation">Chat</NavLink>
  </li>
  <li>
<NavLink to="/Login">Login/Signup</NavLink>
  </li>
    </ul>
    <figure className={styles.profileFigure}>
  <img src="./icons/profile-icon.svg" alt="" />
</figure>
{/* <figure className={styles.hamburgerIconContainer}>
  <img src="./icons/menu-icon.svg" alt="" />
</figure> */}

    </nav>
  )
}

export default Navbar