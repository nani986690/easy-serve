const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  id:    { type: String, required: true },
  name:  { type: String, required: true },
  qty:   { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new mongoose.Schema({
  table:  { type: Number, required: true },
  status: { type: String, enum: ['New', 'Preparing', 'Served'], default: 'New' },
  items:  [orderItemSchema],
  total:  { type: Number, required: true },
  note:   { type: String, default: '' },
  time:   { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
