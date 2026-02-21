// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');

const app = express();

// Middleware
app.use(cors()); // allow requests from different ports
app.use(express.json()); // parse JSON requests
// Request logger for debugging
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

// Serve static files from frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);
// backward-compat: some frontend versions use /api/users
app.use('/api/users', authRoutes);

// Debug endpoints
app.get('/api/debug/ping', (req, res) => res.json({ ok: true }));
app.get('/api/debug/routes', (req, res) => {
  try {
    const routes = [];
    app._router.stack.forEach((layer) => {
      if (layer.route && layer.route.path) {
        routes.push({ path: layer.route.path, methods: Object.keys(layer.route.methods) });
      } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
        layer.handle.stack.forEach((l) => {
          if (l.route && l.route.path) {
            routes.push({ path: l.route.path, methods: Object.keys(l.route.methods) });
          }
        });
      }
    });
    res.json({ routes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/problemMarketplace';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Diagnostic: list mounted routes
setTimeout(() => {
  try {
    const routes = [];
    app._router.stack.forEach((layer) => {
      if (layer.route && layer.route.path) {
        const methods = Object.keys(layer.route.methods).join(',').toUpperCase();
        routes.push({ path: layer.route.path, methods });
      } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
        layer.handle.stack.forEach((l) => {
          if (l.route && l.route.path) {
            const methods = Object.keys(l.route.methods).join(',').toUpperCase();
            // prefix may be in layer.regexp, include parent if present
            routes.push({ path: l.route.path, methods });
          }
        });
      }
    });
    console.log('Mounted routes:', JSON.stringify(routes, null, 2));
  } catch (err) {
    console.error('Failed to list routes:', err);
  }
}, 500);