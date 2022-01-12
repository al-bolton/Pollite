const mongoose = require('mongoose');

const db = {};

db.Poll = require('./poll.model')(mongoose);
db.DateChoice = require('./dateChoice.model')(mongoose);
db.Venue = require('./venue.model')(mongoose);

module.exports = db;