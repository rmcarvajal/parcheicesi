import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; 

const Navbar: React.FC = () => {
  const navItems = [
    { to: '/', icon: '🏠', label: 'Home' }, // Ruta principal para Feed
    { to: '/search', icon: '🔍', label: 'Search' },
    { to: '/messages', icon: '💬', label: 'Messages' },
    { to: '/more', icon: '⛶', label: 'More' }, // Para perfil, grupos, etc.
  ];

  return (
    <nav className="navbar">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `nav-btn ${isActive ? 'active' : ''}`}
          aria-label={item.label}
        >
          <span className="nav-icon">{item.icon}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navbar;