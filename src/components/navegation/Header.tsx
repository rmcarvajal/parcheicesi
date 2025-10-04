import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/LOGO horizontal.png'; 
import './Header.css'; 

interface HeaderProps {
  title?: string; 
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const tabs = [
    { to: '/events', label: 'Eventos' },
    { to: '/campus', label: 'Campus' },
    { to: '/noticias', label: 'Noticias' },
    { to: '/donar', label: 'Donar' },
  ];

  return (
    <header className="header">
      <div className="header-top">
        <div className="header-left">
          <img src={logo} alt="Parche ICESI" className="logo" />
          {title && <h1 className="header-title">{title}</h1>}
        </div>
        <div className="header-actions">
          <button className="icon-btn" aria-label="Configuración">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          <button className="icon-btn" aria-label="Notificaciones">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
      </div>
      <nav className="header-tabs">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            //  active 
            style={({ isActive }) => ({
              color: isActive ? '#10B981' : '#64748B',
              fontWeight: isActive ? 'bold' : 'normal',
              borderBottom: isActive ? '2px solid #10B981' : 'none',
            })}
            className="tab-link"
          >
            {tab.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;