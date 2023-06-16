const mongoose = require('mongoose');

const connectToDatabase = async () => {
  try {
    await mongoose.connect('<mongo_connection_string>', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = { connectToDatabase };
