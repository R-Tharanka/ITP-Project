# Stockpile Handling System

A comprehensive inventory and stock management system designed for NELCO, a manufacturing company specializing in food products like turmeric, dry chilly, ginger, pepper, and garlic.

## Overview

The Stockpile Handling System is a full-stack web application that provides efficient inventory and stock management capabilities. It allows users to track raw materials, semi-finished products, final products, returned goods, and wastage throughout the production cycle.

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
├── src/
│   ├── api.js         # API connection functions
│   ├── assets/        # Images and static files
│   ├── components/    # Reusable UI components
│   │   ├── chart/     # Chart components
│   │   └── styles/    # Component-specific styles
│   ├── layouts/       # Layout components
│   ├── pages/         # Page components
│   └── styles/        # Global styles
```

### Backend
```
backend/
├── config/            # Configuration files
├── controllers/       # Request handlers
├── middleware/        # Express middleware
├── models/            # MongoDB schemas
│   ├── Inventory.js
│   ├── InventoryStatus.js
│   ├── Stock.js
│   ├── UnloadStock.js
│   └── userModel.js
├── routes/            # API routes
│   ├── inventoryRoutes.js
│   ├── loadStockRoutes.js
│   ├── unload_stockRoutes.js
│   └── userRoutes.js
└── server.js          # Entry point
```

## Installation and Setup

### Prerequisites
- Node.js (v14+)
- npm (v6+)
- MongoDB (v4+)

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

4. Start the server:
   ```
   npm run dev
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

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage

1. **Dashboard**: Start from the dashboard to get an overview of current inventory and stock
2. **Manage Inventory**: Add, update, or delete inventory items
3. **Add Stock**: Add new stock items to the system
4. **Manage Stock**: Filter and view stock by different categories
5. **Stock Records**: View records of all loading and unloading operations and generate reports

## Data Models

### Inventory
- Id: Unique identifier
- location: Physical location of the inventory
- capacity: Maximum capacity (in cubic meters)
- itemTypes: Types of items that can be stored (raw materials, final products, etc.)

### Stock
- sku: Stock Keeping Unit (auto-generated)
- itemName: Name of the item
- itemType: Type of item (Raw Material, Final Product, etc.)
- amount: Quantity in kg
- worth: Value in currency
- occupiedSpace: Space occupied in cubic meters
- date: Date of entry

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
