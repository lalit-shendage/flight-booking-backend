// models/seat.js

const mongoose = require('mongoose');

const seatSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  seat_identifier: {
    type: String,
    required: true
  },
  seat_class: {
    type: String,
    required: true
  },
  min_price: {
    type: String,
    required: true
  },
  normal_price: {
    type: String,
    required: true
  },
  max_price: {
    type: String,
    required: true
  },
  booked: {
    type: Boolean,
    required: true
  }
});

const Seat = mongoose.model('Seat', seatSchema);

module.exports = Seat;
