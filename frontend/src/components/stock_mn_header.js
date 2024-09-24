import React from 'react';
import './styles/stock_mn_header.css';
import bellIcon from '../assets/img/stockpile management/icon/bell.png';
import profileImage from '../assets/img/stockpile management/profile.png';

const St_Header = () => {
  return (
    <div className="header-wrap">
      <header className="st-header">
        <div className="st-logo">
          <h1>NELCO</h1>
        </div>
        <div className="st-header-right">
          <div className="st-notifications">
            <img src={bellIcon} alt="Notifications" className="st-bell-icon" />
          </div>
          <div className="st-profile">
            <img src={profileImage} alt="Profile" className="st-profile-img" />
          </div>
        </div>
      </header>
    </div>
  );
};

export default St_Header;
