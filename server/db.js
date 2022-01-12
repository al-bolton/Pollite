const mongoose = require('mongoose');
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'pollite';

try {
  mongoose.connect(`mongodb://localhost:${DB_PORT}/${DB_NAME}`);
  console.log('Successfully connected to Pollite MongoDB');
} catch (err) {
  console.log('Error setting up Pollite MongoDB', err);
}

module.exports = mongoose;