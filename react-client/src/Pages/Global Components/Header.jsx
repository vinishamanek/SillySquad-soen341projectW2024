import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../apiServices/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import websiteLogo from '../../Images/341Logo.png';
import { useNavigate } from 'react-router-dom';
import DarkModeSwitch from "./DarkModeSwitch";

function Header({ isDarkMode, toggleDarkMode }) {
  
  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // Corrected typo
  const { isLoggedIn } = useAuth(); // Simplified destructuring for demonstration

  return (
    <div className={`header ${isDarkMode ? 'dark-mode' : ''}`}>
        <img src={websiteLogo} alt="Logo" className="headerLogo" onClick={() => navigate("/")}/>
        <div className="profile">
        {isLoggedIn && (
            <Link to="/profile" className={`sidebarLink ${location.pathname === '/profile' ? 'activeLink' : ''}`}>
              <AccountCircleIcon className="icon" />
              <span className="sidebarTitle">My Profile</span>
            </Link>
        )}
        </div>
        {/* Render DarkModeSwitch component */}
        <DarkModeSwitch isDarkMode={isDarkMode} onToggle={toggleDarkMode} />
    </div>
  );
}

export default Header;
