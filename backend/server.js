const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

require('dotenv').config(); // Load environment variables

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Handle CORS issues between frontend and backend
app.use(express.json()); // Parse incoming requests with JSON payloads

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
app.use('/api/users', require('./routes/userRoutes'));

// API route to add inventory
const inventoryRoutes = require('./routes/inventoryRoutes');
app.use('/api/inventory', inventoryRoutes);// This makes the route available at /api/inventory


// API route to add stock
const stockRoutes = require('./routes/loadStockRoutes'); // Add stock routes
app.use('/api/stock', stockRoutes); // This makes the route available at /api/stock

// API route to view loadstock
const loadStockRoutes = require('./routes/loadStockRoutes'); // Adjust if necessary
app.use('/api', loadStockRoutes);

// API route to add unload stock
const unloadStockRoutes = require('./routes/unload_stockRoutes');
app.use('/api/unload_stocks', unloadStockRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

