const Seat = require('../models/seat');

// GET /seats
const getAllSeats = async (req, res) => {
  try {
    const seats = await Seat.find();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// GET /seats/:id
const getSeatPricing = async (req, res) => {
  const seatId = req.params.id;

  try {
    const seat = await Seat.findById(seatId);

    if (!seat) {
      return res.status(404).json({ error: 'Seat not found' });
    }

    const { min_price, max_price, normal_price } = seat;
    const bookingsCount = await Seat.countDocuments({ seat_class: seat.seat_class, booked: true });

    let price;

    if (bookingsCount < 0.4 * seat.totalSeats) {
      price = min_price || normal_price;
    } else if (bookingsCount >= 0.4 * seat.totalSeats && bookingsCount <= 0.6 * seat.totalSeats) {
      price = normal_price || max_price;
    } else {
      price = max_price || normal_price;
    }

    res.json({
      seat,
      pricing: price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  getAllSeats,
  getSeatPricing,
};
