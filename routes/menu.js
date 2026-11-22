const express   = require('express');
const router    = express.Router();
const menuItems = require('../data/menuItems');

// GET all menu items (optional ?cat= filter)
router.get('/', (req, res) => {
  const { cat } = req.query;
  const result  = cat ? menuItems.filter(i => i.cat === cat) : menuItems;
  res.json(result);
});

module.exports = router;
