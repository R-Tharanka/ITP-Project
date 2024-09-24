import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/op_port_header';
import '../styles/operation_portal.css';
import Footer from '../components/footer';
import OpChartProduction from '../components/chart/op_chartProduction';
import OpChartSales from '../components/chart/op_chartSales';
import heroImage from '../assets/img/Operations Portal/hero-image.png';


function opPortal() {
  return (
    
        <div className='opPortal'>
          <Header/>

          <div className='body-content-container'>

            {/* Sidebar */}
            <div className="side-nav">

                <div className="menu-icon">
                  <i className="toggl_menu_i">
                    <img src={require('../assets/img/Operations Portal/icon/menus.png')} alt="menu" className="toggl_menu_img" />
                  </i>
                </div>

              <nav className="nav-links">

                <a href="#" className="nav-item">
                  <img src={require('../assets/img/Operations Portal/icon/supply-chain.png')} alt="Supply Chain" className="nav-icon" />
                  <span>Supply Chain</span>
                </a>

                <Link to="/inventory" className="nav-item">
                  <img src={require('../assets/img/Operations Portal/icon/inventory-management.png')} alt="Store" className="nav-icon" />
                  <span>Store</span>
                </Link>

                <a href="#" className="nav-item">
                  <img src={require('../assets/img/Operations Portal/icon/product-management.png')} alt="Production" className="nav-icon" />
                  <span>Production</span>
                </a>

                <a href="#" className="nav-item">
                  <img src={require('../assets/img/Operations Portal/icon/hr.png')} alt="Human Resource" className="nav-icon" />
                  <span>Human Resource</span>
                </a>

                <a href="#" className="nav-item">
                  <img src={require('../assets/img/Operations Portal/icon/financial.png')} alt="Financial" className="nav-icon" />
                  <span>Financial</span>
                </a>
              </nav>
              
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
              
              <div className='chart-main-container'>
                <OpChartSales />
                <OpChartProduction />
              </div>
              

              {/* Values Section */}
              <section className="values-section">

                <h3>Our Values</h3>

                <div className="values-logos">
                  <img src="path/to/logo1.jpg" alt="Value 1" />
                  <img src="path/to/logo2.jpg" alt="Value 2" />
                  <img src="path/to/logo3.jpg" alt="Value 3" />
                  <img src="path/to/logo4.jpg" alt="Value 4" />
                  <img src="path/to/logo5.jpg" alt="Value 5" />
                </div>
              </section>

            </div>

          </div>

          <Footer/>
        </div>
        
  );
}

export default opPortal;
