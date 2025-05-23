import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/op_port_header';
import '../styles/operation_portal.css';
import '../styles/operation_portal_main_side_navigation.css'
import Footer from '../components/footer';
// import OpChartProduction from '../components/chart/op_chartProduction';
// import OpChartSales from '../components/chart/op_chartSales';

import ToggleIcon from '../assets/img/Operations Portal/icon/menus.png';
import SupplyChainIcon from '../assets/img/Operations Portal/icon/supply-chain.png';
import InventoryManagementIcon from '../assets/img/Operations Portal/icon/inventory-management.png';
import ProductionIcon from '../assets/img/Operations Portal/icon/product-management.png';
import HumanResourceIcon from '../assets/img/Operations Portal/icon/hr.png';
import FinancialIcon from '../assets/img/Operations Portal/icon/financial.png';

import heroImage from '../assets/img/Operations Portal/hero-image.png';
import GMP from '../assets/img/Operations Portal/GMP.png';
import HACCP from '../assets/img/Operations Portal/HACCP.png';
import RvA from '../assets/img/Operations Portal/RvA.png';
import SLAB from '../assets/img/Operations Portal/SLAB.png';
import SLS22000 from '../assets/img/Operations Portal/SLS-22000.png';


const OpPortal = () => {
  const [isCollapsed, setIsCollapsed] = useState(false); // State to track sidebar collapse
  const [activeItem, setActiveItem] = useState(''); 
  const [showSupplyDropdown, setShowSupplyDropdown] = useState(false); // Track dropdown for Supply Chain
  const [showProductionDropdown, setShowProductionDropdown] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle collapse state
  };

  const toggleSupplyDropdown = () => {
    setShowSupplyDropdown(!showSupplyDropdown); // Toggle supply dropdown
  };

  const toggleProductionDropdown = () => {
    setShowProductionDropdown(!showProductionDropdown); // Toggle production dropdown
  };

  const handleNavItemClick = (item) => {
    // Handle navigation and active state
    setActiveItem(item);
  
    // Toggle the respective dropdowns based on clicked item
    if (item === 'Supply Chain') {
      toggleSupplyDropdown();
      setShowProductionDropdown(false); // Close other dropdown
    } else if (item === 'Production') {
      toggleProductionDropdown();
      setShowSupplyDropdown(false); // Close other dropdown
    } else {
      // Close all dropdowns for non-dropdown items
      setShowSupplyDropdown(false);
      setShowProductionDropdown(false);
    }
  };
  

  return (
    
        <div className='opPortal'>
          <Header/>

          <div className='body-content-container'>

            {/* Sidebar */}
            <div className={isCollapsed ? 'side-nav op-sidebar collapsed' : 'side-nav op-sidebar'}>

              {/* Toggle button */}
              <div className="toggle-btn" onClick={toggleSidebar}>
                <img src={ToggleIcon} alt="Toggle" className="toggle-icon" />
              </div>

              <ul className="nav-links">
                <li
                  className={`nav-item ${activeItem === 'Supply Chain' ? 'active show-dropdown' : ''}`}
                  onClick={() => {
                    setActiveItem('Supply Chain');
                    toggleSupplyDropdown();
                  }}
                >
                  <img src={SupplyChainIcon} alt="Supply Chain" className="nav-icon" />
                  {!isCollapsed && <span>Supply Chain</span>}
                </li>
                {/* Dropdown links for Supply Chain */}
                {showSupplyDropdown && !isCollapsed && (
                  <ul className="dropdown-container">
                    <li className="dropdown-item"><Link to="/supplier-handling">Supplier Handling</Link></li>
                    <li className="dropdown-item"><Link to="/resource-management">Resource</Link></li>
                  </ul>
                )}

                <li 
                  className={`nav-item ${activeItem === 'Store' ? 'active' : ''}`} 
                  onClick={() => setActiveItem('Store')}
                >
                  <Link 
                  to="/inventory">
                    <img src={InventoryManagementIcon} alt="Store" className="nav-icon" />
                    {!isCollapsed && <span>Store</span>}
                  </Link>
                </li>

                <li
                  className={`nav-item ${activeItem === 'Production' ? 'active show-dropdown' : ''}`}
                  onClick={() => {
                    setActiveItem('Production');
                    toggleProductionDropdown();
                  }}
                >
                  <img src={ProductionIcon} alt="Production" className="nav-icon" />
                  {!isCollapsed && <span>Production</span>}
                </li>
                {/* Dropdown links for Production */}
                {showProductionDropdown && !isCollapsed && (
                  <ul className="dropdown-container">
                    <li className="dropdown-item"><Link to="/operation">Operation</Link></li>
                    <li className="dropdown-item"><Link to="/quality">Quality</Link></li>
                    <li className="dropdown-item"><Link to="/sales">Sales</Link></li>
                  </ul>
                )}

                <li  
                  className={`nav-item ${activeItem === 'Human Resource' ? 'active' : ''}`} 
                  onClick={() => setActiveItem('Human Resource')}
                >
                  <img src={HumanResourceIcon} alt="Human Resource" className="nav-icon" />
                  {!isCollapsed && <span>Human Resource</span>}
                </li>

                <li 
                  className={`nav-item ${activeItem === 'Financial' ? 'active' : ''}`} 
                  onClick={() => setActiveItem('Financial')}
                >
                  <img src={FinancialIcon} alt="Financial" className="nav-icon" />
                  {!isCollapsed && <span>Financial</span>}
                </li>
              </ul>
            </div>

            <div className='body-content'>
              
              {/* Vision Section */}
              <section className="hero-section">

                <div className="hero-content">

                  <div className="polka-dots"></div>
                  <h1 className="hero-title">Our Vision</h1>

                  <p className="hero-description">
                    To increase our overall footprint in the local market by capitalizing on the efficiency and
                    unity of our staff members while facing and overcoming competitive challenges in the industry and 
                    to also contribute to the development of the nation and its economy.
                  </p>

                </div>

                <div className="hero-image">

                  <img src={heroImage} alt="Vision Illustration" />
                  <div className="polka-dots-bottom"></div>
                  <div className='performance-metrics-button-container'>
                    <button className="performance-metrics-button">Performance Metrics</button>
                  </div>
                </div>

              </section>

              {/* Stats Section */}
              <div className="statistics">

                <div className="stat-card">
                  <h3>Customers</h3>
                  <p>9,999 +</p>
                </div>

                <div className="stat-card">
                  <h3>Production Staff</h3>
                  <p>122</p>
                </div>

                <div className="stat-card">
                  <h3>Office Staff</h3>
                  <p>26</p>
                </div>

              </div>

              {/* Charts Section */}
              
              {/* <div className='chart-main-container'>
                <OpChartSales />
                <OpChartProduction />
              </div> */}
              

              {/* Values Section */}
              <section className="values-section">

                <h3>Our Values</h3>

                <div className="values-logos">
                  <img src={GMP} alt="Value 1" />
                  <img src={HACCP} alt="Value 2" />
                  <img src={RvA} alt="Value 3" />
                  <img src={SLAB} alt="Value 4" />
                  <img src={SLS22000} alt="Value 5" />
                </div>
              </section>

            </div>

          </div>

          <Footer/>
        </div>
        
  );
}

export default OpPortal;
