import React, { Component } from 'react';
//import './header.css';

const Header = () => {
    return <header className="shadow">
                <div className="container">
                <a href="#" className="logo">
                    MovieDB
                </a>
              <nav id="main-menu">
                  <ul>
                      <li>
                          <a href="#">Home</a>
                      </li>
                  </ul>
              </nav>
                </div>
           </header>
    }
  
export default Header;
