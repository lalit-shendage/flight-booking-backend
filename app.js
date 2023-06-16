const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const seatRoutes = require('./routes/seats');
const bookingRoutes = require('./routes/bookings');

const app = express();
 
const PORT=3000;
// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/your_database_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/seats', seatRoutes);
app.use('/bookings', bookingRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
