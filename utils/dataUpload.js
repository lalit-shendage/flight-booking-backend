const fs = require('fs');
const csvParser = require('csv-parser');
const Seat = require('../models/seat');

const dataUpload = (filePath) => {
  const seats = [];

  // Read the CSV file
  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on('data', (row) => {
      // Extract data from each row and create Seat objects
      const { seatId, seatClass, isBooked, minPrice, maxPrice, normalPrice } = row;

      const seat = new Seat({
        seatId,
        seatClass,
        isBooked,
        pricing: {
          minPrice,
          maxPrice,
          normalPrice,
        },
      });

      seats.push(seat);
    })
    .on('end', async () => {
      try {
        // Insert the seats into the database
        await Seat.insertMany(seats);
        console.log('Data upload successful');
      } catch (error) {
        console.error('Error uploading data:', error);
      }
    });
};

module.exports = dataUpload;
