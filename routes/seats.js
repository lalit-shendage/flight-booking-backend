const express = require('express');
const seatsController = require('../controllers/seatsController');

const router = express.Router();

// GET /seats
router.get('/', seatsController.getAllSeats);

// GET /seats/:id
router.get('/:id', seatsController.getSeatPricing);

module.exports = router;
