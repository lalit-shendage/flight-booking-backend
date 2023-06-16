const Booking = require('../models/booking');
const Seat = require('../models/seat');

// Create Booking
const createBooking = async (req, res) => {
  const { seat_ids, name, phone_number } = req.body;

  try {
    const seats = await Seat.find({ _id: { $in: seat_ids } });

    // Check if any of the seats are already booked
    const bookedSeats = seats.filter(seat => seat.booked);
    if (bookedSeats.length > 0) {
      return res.status(400).json({ error: 'One or more seats are already booked' });
    }

    // Update the booked status of the seats to true
    await Seat.updateMany({ _id: { $in: seat_ids } }, { $set: { booked: true } });

    // Create the new booking
    const newBooking = await Booking.create({ seat_ids, name, phone_number });


    res.json({
      booking_id: newBooking._id,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Retrieve Bookings
const retrieveBookings = async (req, res) => {
  const userIdentifier = req.query.userIdentifier;

  if (!userIdentifier) {
    return res.status(400).json({ error: 'User identifier is required' });
  }

  try {
    const bookings = await Booking.find({ $or: [{ email: userIdentifier }, { phone_number: userIdentifier }] });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createBooking,
  retrieveBookings,
};
