import { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

import PollModel from 'data/models/poll.model';
import DateChoiceModel from 'data/models/dateChoice.model';
import VenueModel from 'data/models/venue.model';

import { DBPoll } from '../../../../data/types/db/DBPoll.type';

import dbConnect from '../../../../lib/dbConnect';

export default async function voteOnPoll(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  const {
    dates,
    venues
  } = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  await dbConnect();

  try {
    const poll: null | DBPoll = await PollModel.findOne({ linkCode: code });

    if (poll) {

      // Update poll with new votes
      poll.dates.forEach(async (dateId: mongoose.Types.ObjectId) => {
        const date = await DateChoiceModel.findById(dateId);
        if (date) {
          if (dates.includes(date.dateString)) date.votes++;
          date.save();
        }
      });
      poll.venues.forEach(async (venueId: mongoose.Types.ObjectId) => {
        const venue = await VenueModel.findById(venueId);
        if (venue) {
          if (venues.includes(venue.name)) venue.votes++;
          venue.save();
        }
      });

      // Retrieve the poll with the updated values and send back to client
      const updatedPoll = await PollModel.findOne({ linkCode: code })
      .populate('dates')
      .populate('venues');

      res.status(200);
      res.json(updatedPoll);
    } else {
      res.status(404);
      res.json('Could not find poll with code ' + code);
    }
  }
  catch (err) {
    console.log('Error updating poll with link code: ' + code, err);
  }
}