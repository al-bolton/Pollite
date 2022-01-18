import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import { DBVenue } from 'data/types/db/DBVenue.type';
import { DBDate } from 'data/types/db/DBDate.type';

import PollModel from 'data/models/poll.model';
import DateChoiceModel from 'data/models/dateChoice.model';
import VenueModel from 'data/models/venue.model';

import dbConnect from 'lib/dbConnect';

// Function to generate a randomised code for sharing the poll
function genCode(chars: Number) {
  let text = '';
  const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const codeCharsLen = codeChars.length;

  for (var i = 0; i < chars; i++) {
    text += codeChars.charAt(Math.floor(Math.random() * codeCharsLen));
  }

  return text;
}

export default async function createPoll(req: NextApiRequest, res: NextApiResponse) {
  // Extract data from our request body
  const {
    title,
    dates,
    venues,
  } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  await dbConnect();

  // For each date, we need to create a new DateChoice in our DB, then save the IDs to associate our poll with this data
  // with the mongoose populate method
  const dateIds: mongoose.Types.ObjectId[] = [];

  await dates.map(async (date: DBDate) => {
    const dateChoice = new DateChoiceModel({
      _id: new mongoose.Types.ObjectId(),
      dateString: date
    });
    dateIds.push(dateChoice._id);

    try {
      await dateChoice.save();
    } catch (err) {
      console.log('Error saving date to MongoDB', err);
    }
  });

  // Now for each date, we need to create a venue in our DB, and again save the IDs for the populate() method
  const venueIds: mongoose.Types.ObjectId[] = [];

  await venues.map(async (venue: DBVenue) => {
    const { name, latitude, longitude, imgUrl, rating, num_reviews, price_level, ranking, cuisine, phone, website, address } = venue;
    const newVenue = new VenueModel({ name, latitude, longitude, imgUrl, rating, num_reviews, price_level, ranking, cuisine, phone, website, address });
    venueIds.push(newVenue._id);

    try {
      await newVenue.save();
    } catch (err) {
      console.log('Error saving venue to MongoDB', err);
    }
  });

  // Finally, we create and save our new poll in the DB and return our HTTP code
  const newCode = genCode(40);
  const poll = new PollModel({
    title,
    dates: dateIds,
    venues: venueIds,
    linkCode: newCode
  });

  try {
    await poll.save();
    res.status(201);
    res.json({
      code: newCode
    });
  } catch (err) {
    console.log('Problem saving poll to MongoDB', err);
  }
}