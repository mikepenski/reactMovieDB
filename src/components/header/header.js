//import React, { Component } from 'react';
//import './header.css';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return <header className="shadow">
                <div className="container">
                <div className="logo">
                <img src={logo} alt="Logo MovieDB" width="32" height="32" / > MovieDB 
                </div>
                {/*
                   <nav id="main-menu">
                  <ul>
                      <li>
                          <span>Home</span>
                      </li>
                  </ul>
              </nav>
                */}
                </div>
           </header>
    }
  
export default Header;
