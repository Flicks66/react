import React from 'react';
import { FaUtensils } from 'react-icons/fa';
import './styles.css';

function Header() {
  return (
    <header className="header" role="banner">
      <div className="header-content">
        <div className="logo">
          <FaUtensils className="logo-icon" />
          <span className="logo-text">F<a>oo</a>diesHub</span>
       
        </div>
      </div>
    </header>
  );
}

export default Header;
