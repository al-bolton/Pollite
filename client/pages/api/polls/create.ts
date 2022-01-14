import type { NextApiRequest, NextApiResponse } from 'next';
const mongoose = require('mongoose');
import { Types } from 'mongoose';
import { DBVenue } from '../../../data/types/db/DBVenue.type';
import { DBDate } from '../../../data/types/db/DBDate.type';
const db = require('../../../data/models/index.model');

import { dbConnect } from '../../../lib/dbConnect';

export default async function createPoll(req: NextApiRequest, res: NextApiResponse) {
  // Extract data from our request body
  const {
    title,
    dates,
    venues,
  } = JSON.parse(req.body);

  await dbConnect();

  // For each date, we need to create a new DateChoice in our DB, then save the IDs to associate our poll with this data
  // with the mongoose populate method
  const dateIds: Types.ObjectId[] = [];

  await dates.map(async (date: DBDate) => {
    const dateChoice = new db.DateChoice({
      _id: new mongoose.Types.ObjectId(),
      dateString: date
    });
    dateIds.push(dateChoice._id);

    await dateChoice.save(function (err: Error) {
      if (err) {
        console.log('Error saving date to MongoDB', err);
      }
    });
  });

  // Now for each date, we need to create a venue in our DB, and again save the IDs for the populate() method
  const venueIds: Types.ObjectId[] = [];

  await venues.map(async (venue: DBVenue) => {
    const { name, latitude, longitude, imgUrl, rating, num_reviews, price_level, ranking, cuisine } = venue;
    const newVenue = new db.Venue({ name, latitude, longitude, imgUrl, rating, num_reviews, price_level, ranking, cuisine });
    venueIds.push(newVenue._id);

    await newVenue.save(function (err: Error) {
      if (err) {
        console.log('Error saving venue to MongoDB', err);
      }
    });
  });

  // Finally, we create and save our new poll in the DB and return our HTTP code
  const poll = new db.Poll({
    title,
    dates: dateIds,
    venues: venueIds,
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
}