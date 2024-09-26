// import React from 'react';
// import StockMnHeader from '../components/stock_mn_header';
// import StockMnFooter from '../components/stock_mn_footer'
// import StockMnSideNav from '../components/stock_mn_sidenav';
// import St_InventoryStatus from '../components/stock_mn_inventory_status'
// import St_dshb_StockTable from '../components/stock_mn_dashb_stocktable'
// import '../styles/stockpile_dashboard.css';


// const StockpileDashboard = () => {
//   return (
//     <div className="dashboard-container">
//       <StockMnHeader />

//       <div className="main-content">
//         <StockMnSideNav />

//         <div className="stockpile-section">

//           <div className="stockpile-header">
//             <button className="stockpile-btn">Stockpile 1</button>
//             <button className="add-stockpile-btn">+ Add Stockpile</button>
//           </div>

//           <div className="stockpile-items">

//             <div className="stockpile-item">
//               <div className="stockpile-item-indiv1">
//                 <img src={require('../assets/img/stockpile management/item1.png')} alt="Item 1" />
//                 <h3>Item 1</h3>
//               </div>
//               <div className="stockpile-item-indiv2">
//                 <p>Item count</p>
//                 <span>600 kg</span>
//               </div>
//             </div>

//             <div className="stockpile-item">
//               <div className="stockpile-item-indiv1">
//                 <img src={require('../assets/img/stockpile management/item2.png')} alt="Item 2" />
//                 <h3>Item 2</h3>
//               </div>
//               <div className="stockpile-item-indiv2">
//                 <p>Item count</p>
//                 <span>200 kg</span>
//               </div>
//             </div>

//             <div className="stockpile-item">
//               <div className="stockpile-item-indiv1">
//                 <img src={require('../assets/img/stockpile management/item1.png')} alt="Item 3" />
//                 <h3>Item 3</h3>
//               </div>
//               <div className="stockpile-item-indiv2">
//                 <p>Item count</p>
//                 <span>500 kg</span>
//               </div>
//             </div>

//             <div className="stockpile-item">
//               <div className="stockpile-item-indiv1">
//                 <img src={require('../assets/img/stockpile management/item2.png')} alt="Item 4" />
//                 <h3>Item 4</h3>
//               </div>
//               <div className="stockpile-item-indiv2">
//               <p>Item count</p>
//               <span>100 kg</span>
//               </div>
//             </div>
            
//           </div>

//           <St_InventoryStatus/>

//           <St_dshb_StockTable/>

//         </div>
//       </div>
      
//       <StockMnFooter/>
//     </div>
//   );
// };

// export default StockpileDashboard;

import React, { useState } from 'react';
import StockMnHeader from '../components/stock_mn_header';
import StockMnFooter from '../components/stock_mn_footer';
import StockMnSideNav from '../components/stock_mn_sidenav';
import St_InventoryStatus from '../components/stock_mn_inventory_status';
import St_dshb_StockTable from '../components/stock_mn_dashb_stocktable';
import '../styles/inventory_dashboard.css';

const InventoryDashboard = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="dashboard-container">
      <StockMnHeader />

      <div className={`main-content ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        {/* Pass toggleSidebar function to the side nav component */}
        <StockMnSideNav isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />

        <div className={`stockpile-section ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
          <div className="stockpile-header">
            <button className="stockpile-btn">Stockpile 1</button>
            <button className="add-stockpile-btn">+ Add Stockpile</button>
          </div>

          <div className="stockpile-items">
            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item1.png')} alt="Item 1" />
                <h3>Item 1</h3>
              </div>
              <div className="stockpile-item-indiv2">
                <p>Item count</p>
                <span>600 kg</span>
              </div>
            </div>
            
            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item2.png')} alt="Item 2" />
                <h3>Item 2</h3>
              </div>
              <div className="stockpile-item-indiv2">
                <p>Item count</p>
                <span>200 kg</span>
              </div>
            </div>

            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item1.png')} alt="Item 3" />
                <h3>Item 3</h3>
              </div>
              <div className="stockpile-item-indiv2">
                <p>Item count</p>
                <span>500 kg</span>
              </div>
            </div>

            <div className="stockpile-item">
              <div className="stockpile-item-indiv1">
                <img src={require('../assets/img/stockpile management/item2.png')} alt="Item 4" />
                <h3>Item 4</h3>
              </div>
              <div className="stockpile-item-indiv2">
              <p>Item count</p>
              <span>100 kg</span>
              </div>
            </div>
            
          </div>

          <St_InventoryStatus />
          <St_dshb_StockTable />
        </div>
      </div>

      <div className={`footer-main-container ${isSidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <StockMnFooter />
      </div>

    </div>
  );
};

export default InventoryDashboard;
