const express = require('express');
const path = require('path');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

// Initialize Express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Serve uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/authors', require('./routes/authors'));
app.use('/api/comments', require('./routes/comments'));
app.use('/api/subscribers', require('./routes/subscribers'));
app.use('/api/uploads', require('./routes/uploads'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'dist', 'index.html'));
  });
}

// Define PORT
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
