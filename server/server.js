const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
    console.log('✅ MongoDB connected');
  })
  .catch((err) => {
    console.error('❌ Error in database connection:', err);
  });

// API Routes
app.use('/user-api', require('./APIs/userApi'));
app.use('/author-api', require('./APIs/authorApi'));
app.use('/admin-api', require('./APIs/adminApi'));

// Serve frontend build files
const frontendPath = path.join(__dirname, '../client/dist'); // or '../client/build' for CRA
app.use(express.static(frontendPath));

// SPA Fallback: serve index.html for all non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Error handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
