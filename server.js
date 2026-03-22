require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ── Routes ──
app.use('/api/orders', require('./routes/orders'));
app.use('/api/menu',   require('./routes/menu'));

// ── Fallback: serve index.html for all non-API routes ──
app.get('/{*path}', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ── MongoDB Connection ──
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/easy-serve';
const PORT      = process.env.PORT      || 3000;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected:', MONGO_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Easy Serve server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
