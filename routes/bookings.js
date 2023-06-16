const express = require('express');
const bookingsController = require('../controllers/bookingsController');

const router = express.Router();

// POST /bookings
router.post('/', bookingsController.createBooking);

// GET /bookings?userIdentifier=<email or phone number>
router.get('/', bookingsController.retrieveBookings);

module.exports = router;
