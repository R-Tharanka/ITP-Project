import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles/stock_mn_header.css';
import bellIcon from '../assets/img/stockpile management/icon/bell.png';
import profileImage from '../assets/img/stockpile management/profile.png';

const St_Header = () => {

  const [allTableData, setallTableData] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const fetchData = async () => {
    try {
        // Make an API request to fetch the inventory status data
        const response = await axios.get('http://localhost:5000/api/inventory_status'); //API route
        setallTableData(response.data); // Update tableData with fetched data from the backend

        console.log(response.data);
    } catch (error) {
        console.error('Error fetching inventory status data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filter the data where amount is <= 100
  const filteredItems = allTableData.filter(item => item.amount <= 100);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="header-wrap">
      <header className="st-header">
        <div className="st-logo">
          <Link to="/" className="header-home-link">
            <h1>NELCO</h1>
          </Link>
        </div>
        <div className="st-header-right">
          <div className="st-notifications" onClick={toggleNotifications}>
            <img src={bellIcon} alt="Notifications" className="st-bell-icon" />
            {filteredItems.length > 0 && (
              <span className="notification-dot"></span>
            )}
          </div>
          <div className="st-profile">
            <img src={profileImage} alt="Profile" className="st-profile-img" />
          </div>
        </div>
      </header>

      {showNotifications && (
        <div className="noti-sec-outer-div">
          <p className="notify-title">Notifications</p>
          <div className="notification-section">
            <div className="noti-sec-inner-div">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, index) => (
                  <div key={index} className="notification-item">
                    <p>Stock for {item.itemType} - {item.itemName} is running low. Only {item.amount} kg remaining.</p>
                  </div>
                ))
              ) : (
                <p>No items matching the criteria.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default St_Header;
