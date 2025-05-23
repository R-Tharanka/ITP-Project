# Stockpile Handling System

A comprehensive inventory and stock management system designed for NELCO, a manufacturing company specializing in food products like turmeric, dry chilly, ginger, pepper, and garlic.

## Overview

The Stockpile Handling System is a full-stack web application that provides efficient inventory and stock management capabilities. It allows users to track raw materials, semi-finished products, final products, returned goods, and wastage throughout the production cycle.

This system aims to streamline the company's inventory operations by providing real-time visibility of stock levels, enabling efficient tracking of items from receipt to production and distribution, and generating comprehensive reports for business analytics.

## Features

### Inventory Management
- Add, update, and delete inventory items
- View inventory status with visual representations (pie charts)
- Search and filter inventory items
- Track inventory capacity and occupied space

### Stock Management
- Add new stock items with automatic SKU generation
- Unload stock items from inventory
- Filter stocks by categories (Raw Material, Final Products, etc.)
- Visual data representation with bar charts

### Stock Records
- View comprehensive loading and unloading records
- Search and filter records
- Generate reports in CSV and PDF formats

### Dashboard
- Overview of key metrics and statistics
- Quick access to frequently used functions
- Notifications for low stock items

## Tech Stack

### Frontend
- **React.js**: UI library for building the user interface
- **React Router**: For navigation and routing
- **Axios**: For API requests
- **Chart.js & react-chartjs-2**: For data visualization
- **jsPDF & jspdf-autotable**: For PDF report generation
- **date-fns**: For date formatting and manipulation

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **MongoDB**: NoSQL database for data storage
- **Mongoose**: MongoDB object modeling
- **dotenv**: For environment variable management
- **cors**: For handling Cross-Origin Resource Sharing

## Project Structure

### Frontend
```
frontend/
├── public/            # Public assets
│   ├── index.html     # Main HTML file
│   ├── favicon.ico    # Website icon
│   ├── manifest.json  # Progressive Web App manifest
│   └── robots.txt     # Robot crawling rules
├── src/
│   ├── api.js         # API connection functions
│   ├── App.js         # Main application component
│   ├── App.css        # Application-wide styles
│   ├── index.js       # Application entry point
│   ├── index.css      # Global CSS
│   ├── assets/        # Images and static files
│   │   └── img/       # Image assets
│   │       ├── Operations Portal/   # Operations portal images
│   │       │   └── icon/            # Icon assets
│   │       └── stockpile management/ # Stockpile management images
│   ├── components/    # Reusable UI components
│   │   ├── AddInventoryForm.js      # Form for adding inventory
│   │   ├── AddStockForm.js          # Form for adding stock
│   │   ├── DeleteInventory.js       # Inventory deletion component
│   │   ├── UpdateInventoryForm.js   # Form for updating inventory
│   │   ├── footer.js                # Global footer component
│   │   ├── op_port_header.js        # Operations portal header
│   │   ├── stock_mn_header.js       # Stock management header
│   │   ├── stock_mn_sidenav.js      # Stock management sidebar
│   │   ├── stock_mn_footer.js       # Stock management footer
│   │   ├── stock_mn_dashb_stocktable.js    # Stock table for dashboard
│   │   ├── stock_mn_im_inventorytable.js   # Inventory table component
│   │   ├── stock_mn_inventory_status.js    # Inventory status component
│   │   ├── stock_mn_mnstock_filter.js      # Stock filtering component
│   │   ├── stock_mn_mnstock_stocktable.js  # Stock table for management
│   │   ├── unload_modal.js          # Modal for unloading stock
│   │   ├── chart/                   # Chart components
│   │   │   ├── op_chartProduction.js         # Production chart
│   │   │   ├── op_chartSales.js              # Sales chart
│   │   │   ├── stock_mn_chartInventory_status.js   # Inventory status chart
│   │   │   └── stock_mn_stockmn_chart_summary.js   # Stock summary chart
│   │   └── styles/                  # Component-specific styles
│   │       ├── AddInventoryForm.css
│   │       ├── AddStockForm.css
│   │       ├── delete_inventory.css
│   │       ├── footer.css
│   │       ├── op_port_header.css
│   │       ├── stock_mn_header.css
│   │       ├── stock_mn_footer.css
│   │       ├── stock_mn_sidenav.css
│   │       ├── stock_mn_dashb_stocktable.css
│   │       ├── stock_mn_im_inventorytable.css
│   │       ├── stock_mn_inventory_status.css
│   │       ├── stock_mn_mnstock_stocktable.css
│   │       ├── unload_modal.css
│   │       └── UpdateInventoryForm.css
│   ├── pages/         # Page components
│   │   ├── operation_portal.js         # Main operations portal
│   │   ├── inventory_dashboard.js      # Inventory dashboard
│   │   ├── inventory_manage.js         # Inventory management page
│   │   ├── inventory_stock_manage.js   # Stock management page
│   │   └── inventory_stock_record.js   # Stock records page
│   └── styles/        # Global styles
│       ├── inventory_dashboard.css
│       ├── inventory_manage.css
│       ├── inventory_stock_manage.css
│       ├── inventory_stock_record.css
│       ├── operation_portal.css
│       ├── operation_portal_main_side_navigation.css
│       └── stock_mn_mnstock_filter.css
│

```

### Backend
```
backend/
├── config/            # Configuration files
├── controllers/       # Request handlers
│   └── userController.js   # User-related controller
├── middleware/        # Express middleware
├── models/            # MongoDB schemas
│   ├── Inventory.js          # Inventory model
│   ├── InventoryStatus.js    # Inventory status model
│   ├── Stock.js              # Stock model
│   ├── UnloadStock.js        # Unload stock model
│   └── userModel.js          # User model
├── routes/            # API routes
│   ├── inventoryRoutes.js    # Inventory API routes
│   ├── loadStockRoutes.js    # Load stock API routes
│   ├── unload_stockRoutes.js # Unload stock API routes
│   └── userRoutes.js         # User API routes
├── server.js          # Entry point - Express server setup
└── package.json       # Project dependencies and scripts
```

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- MongoDB (v4+)
- Internet connection (for CDN resources and package installation)

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. Start the server in development mode:
   ```
   npm run dev
   ```
   
   Or for production:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory (optional for custom configuration):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```
   npm start
   ```

5. For production build:
   ```
   npm run build
   ```

6. Open your browser and navigate to `http://localhost:3000`

## Usage

### Main Operations Portal
The Operations Portal serves as the main entry point for users, providing access to:
- Inventory management
- Stock operations
- Production monitoring
- Reports and analytics

### Inventory Management Workflow
1. **Dashboard**: Start from the dashboard to get an overview of current inventory and stock levels across all categories
2. **Manage Inventory**: Add new inventory locations, update capacity, or delete unused inventory spaces
3. **Add Stock**: Add new stock items to the system with details like quantity, value, and space requirements
4. **Manage Stock**: Filter and view stock by different categories (Raw Material, Final Products, etc.)
5. **Stock Records**: View comprehensive records of all loading and unloading operations and generate reports in CSV or PDF format

### Key User Flows
- **Adding New Stock**: Navigate to Stock Management → Add Stock → Fill in details → Submit
- **Unloading Stock**: Navigate to Stock Management → Select item → Unload → Fill details → Confirm
- **Generating Reports**: Navigate to Stock Records → Select date range → Choose format (CSV/PDF) → Generate

## Data Models

### Inventory
- **id**: Unique identifier
- **location**: Physical location of the inventory
- **capacity**: Maximum capacity (in cubic meters)
- **itemTypes**: Types of items that can be stored (raw materials, final products, etc.)
- **createdAt**: Date when the inventory was created
- **updatedAt**: Date when the inventory was last updated

### Inventory Status
- **id**: Unique identifier
- **itemName**: Name of the inventory item
- **itemType**: Category of the item
- **totalAmount**: Total quantity in the inventory
- **remainingAmount**: Current available quantity
- **worth**: Total value of the inventory item
- **occupiedSpace**: Space occupied in cubic meters

### Stock
- **sku**: Stock Keeping Unit (auto-generated)
- **itemName**: Name of the item
- **itemType**: Type of item (Raw Material, Final Product, etc.)
- **amount**: Quantity in kg
- **worth**: Value in currency
- **occupiedSpace**: Space occupied in cubic meters
- **date**: Date of entry
- **imageUrl**: Path to item image (if applicable)

### UnloadStock
- **id**: Unique identifier
- **sku**: Reference to the original stock SKU
- **itemName**: Name of the item
- **itemType**: Type of item
- **amount**: Quantity being unloaded
- **worth**: Value of unloaded stock
- **occupiedSpace**: Space freed up
- **date**: Date of unloading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

NELCO - [www.nelco.lk](http://www.nelco.lk) - info@nelco.lk

## Acknowledgments

- Chart.js for the visualization library
- MongoDB team for the excellent database
- React team for the powerful frontend framework
