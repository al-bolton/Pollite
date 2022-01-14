import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import db from '../../../../data/models/index.model';
import { dbConnect } from '../../../../lib/dbConnect';

export default async function voteOnPoll(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  const {
    dates,
    venues
  } = JSON.parse(req.body);

  await dbConnect();

  try {
    const poll = await db.Poll.findOne({ linkCode: code });

    // Update poll with new votes
    await poll.dates.forEach(async (dateId: mongoose.Types.ObjectId) => {
      const date = await db.DateChoice.findById(dateId);
      if (dates.includes(date.dateString)) date.votes++;
      date.save();
    });
    await poll.venues.forEach(async (venueId: mongoose.Types.ObjectId) => {
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