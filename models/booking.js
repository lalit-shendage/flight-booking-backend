const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  seat_ids: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
