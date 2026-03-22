const express = require('express');
const router  = express.Router();
const Order   = require('../models/Order');

// GET all orders (optional ?table= filter)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.table ? { table: Number(req.query.table) } : {};
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create new order
router.post('/', async (req, res) => {
  try {
    const { table, items, total, note } = req.body;
    const time  = new Date().toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' });
    const order = await Order.create({ table, items, total, note: note || '', time });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH advance order status
router.patch('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE order
router.delete('/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
