const mongoose = require('mongoose');

const db = require('../models/index.model');

module.exports.createPoll = async (req, res) => {
  // Extract data from our request body
  const {
    title,
    dates,
    venues
  } = req.body;

  // For each date, we need to create a new DateChoice in our DB, then save the IDs to associate our poll with this data
  // with the mongoose populate method
  const dateIds = [];

  await dates.map(async date => {
    const dateChoice = new db.DateChoice({
      _id: new mongoose.Types.ObjectId(),
      dateString: date
    });
    dateIds.push(dateChoice._id);

    await dateChoice.save(function (err) {
      if (err) {
        console.log('Error saving date to MongoDB', err);
      }
    });
  });

  // Now for each date, we need to create a venue in our DB, and again save the IDs for the populate() method
  const venueIds = [];

  await venues.map(async venue => {
    const { name, lat, lng } = venue;
    const newVenue = new db.Venue({ name, lat, lng });
    venueIds.push(newVenue._id);

    await newVenue.save(function (err) {
      if (err) {
        console.log('Error saving venue to MongoDB', err);
      }
    });
  });

  // Finally, we create and save our new poll in the DB and return our HTTP code
  const poll = new db.Poll({
    title,
    dates: dateIds,
    venues: venueIds
  });

  try {
    await poll.save();
    res.status(201);
    res.json({
      code: poll.linkCode
    });
  } catch (err) {
    console.log('Problem saving poll to MongoDB', err);
  }
};

module.exports.getPoll = async (req, res) => {
  const { code } = req.params;

  try {
    const poll = await db.Poll.findOne({ linkCode: code })
      .populate('dates')
      .populate('venues');

    res.status(200);
    res.json(poll);
  } catch (err) {
    console.log('Error finding poll with link code: ' + code, err);
  }
};

module.exports.addResponse = async (req, res) => {
  const { code } = req.params;
  const {
    dates,
    venues
  } = req.body;

  try {
    const poll = await db.Poll.findOne({ linkCode: code });

    // Update poll with new votes
    await poll.dates.forEach(async dateId => {
      const date = await db.DateChoice.findById(dateId);
      if (dates.includes(date.dateString)) date.votes++;
      date.save();
    });
    await poll.venues.forEach(async venueId => {
      const venue = await db.Venue.findById(venueId);
      if (venues.includes(venue.name)) venue.votes++;
      venue.save();
    });

    // Retrieve the poll with the updated values and send back to client
    const updatedPoll = await db.Poll.findOne({ linkCode: code })
      .populate('dates')
      .populate('venues');

    res.status(200);
    res.json(updatedPoll);
  }
  catch (err) {
    console.log('Error updating poll with link code: ' + code, err);
  }
}