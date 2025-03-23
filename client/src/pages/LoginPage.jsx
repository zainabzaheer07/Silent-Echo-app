import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import "../PagesStyles/LoginPage.css";
import Login from '../components/Login/Login';
import Signup from '../components/Signup/Signup';

function LoginPage() {
  const location = useLocation(); // Get the current route

  // Determine which component to render based on the pathname
  const isLoginRoute = location.pathname === "/login";
  const ComponentToRender = isLoginRoute ? Login : Signup;

  // Dynamically set the class for login-section
  const sectionClass = isLoginRoute 
    ? 'login-section' 
    : 'login-section login-section-register';

  return (
    <div className='login-page-complete'>
      <div className="greeting-and-back-btn">
        <NavLink to="/">
          <button className='back-btn-login'>
            Back
          </button>
        </NavLink>
        <h3 className='greeting-line'>
          Welcome to Silent Echo
        </h3>
      </div>
      <div className='Login-page-container'>
        <section className={sectionClass}>
          <figure className='left-side'>
            <img src="./images/login-section-img.png" alt="" />
          </figure>
          <div style={{ width: "100%" }} className='right-side'>
            <ComponentToRender /> {/* Render Login or Signup based on route */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;