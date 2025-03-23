import React, { useState } from 'react';
import styles from "./Navbar.module.css";
import { NavLink } from 'react-router-dom';
import { useNavigation } from 'react-router-dom';
import {useLogin} from "../../contexts/LogingContext"
function Navbar() {
  // const {navigate}=useNavigation();


 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
const {user,logout}=useLogin();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout=()=>{
    logout();
    // navigate("/login")
  }

  return (
    <nav className={styles.navbarContainer}>
      <NavLink to="/">
        <figure className={styles.companyLogoContainer}>
          <img src="./icons/silent-echo.svg" alt="Company logo" />
        </figure>
      </NavLink>

      <div className={styles.searchContainer}>
        <img src="./icons/search.svg" alt="" />
        <input type="text" placeholder='Search' />
      </div>

      <ul className={`${styles.navigationList} ${isMenuOpen ? styles.active : ''}`}>
        <li>
          <NavLink to="/" onClick={toggleMenu}>Home</NavLink>
        </li>
        <li>
          <NavLink to="/conversation" onClick={toggleMenu}>Chat</NavLink>

        </li>

        {
    user ? <li><NavLink onClick={handleLogout}>Logout</NavLink></li> 
         : <li><NavLink to="/Login" onClick={toggleMenu}>Login/Signup</NavLink></li>
}
        
      </ul>

      <figure className={styles.profileFigure}>
      {
         user ? <img src={user.image} alt="" />:<img src="./icons/profile-icon.svg" alt="" />
      }
      </figure>

      <figure className={styles.hamburgerIconContainer} onClick={toggleMenu}>
        <img src="./icons/menu-icon.svg" alt="Menu" />
      </figure>
    </nav>
  );
}

export default Navbar;