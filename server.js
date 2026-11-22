require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const path     = require('path');
const fs       = require('fs');

const app = express();

// ── Middleware ──
app.use(cors());
app.use(express.json());

const clientDistPath = path.join(__dirname, 'client', 'dist');
const publicPath     = path.join(__dirname, 'public');

// ── Static Assets ──
// Serve Vite React build in production if present
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
}
// Serve static assets / images from public
app.use(express.static(publicPath));

// ── API Routes (handled before SPA fallback) ──
app.use('/api/orders', require('./routes/orders'));
app.use('/api/menu',   require('./routes/menu'));

// ── Fallback: serve built React app (or legacy public/index.html) for non-API routes ──
app.get('/{*path}', (req, res) => {
  const clientDistIndex = path.join(clientDistPath, 'index.html');
  if (fs.existsSync(clientDistIndex)) {
    return res.sendFile(clientDistIndex);
  }
  res.sendFile(path.join(publicPath, 'index.html'));
});

// ── MongoDB Connection ──
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/easy-serve';
const PORT      = process.env.PORT      || 3000;

const mongooseOptions = {
  serverSelectionTimeoutMS: 10000,
};

// Only force IPv4 on localhost to avoid Node dual-stack resolution delays; allow Atlas to resolve SRV records naturally
if (!MONGO_URI.includes('mongodb+srv://')) {
  mongooseOptions.family = 4;
}

mongoose.connect(MONGO_URI, mongooseOptions)
  .then(() => {
    const maskedUri = MONGO_URI.replace(/:([^@]+)@/, ':****@');
    console.log('✅ MongoDB connected:', maskedUri);
    app.listen(PORT, () => {
      console.log(`🚀 QR Restaurant server running at http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    if (!process.env.MONGO_URI) {
      console.error('👉 Make sure MongoDB is running locally with: mongod or set MONGO_URI in .env');
    }
    process.exit(1);
  });
