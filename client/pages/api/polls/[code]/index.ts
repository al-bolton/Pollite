import type { NextApiRequest, NextApiResponse } from 'next';

import { DBPollPopulated } from 'data/types/db/DBPoll.type';
import PollModel from 'data/models/poll.model';
import DateChoiceModel from 'data/models/dateChoice.model';
import VenueModel from 'data/models/venue.model';
import dbConnect from 'lib/dbConnect';

export default async function viewPoll(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  await dbConnect();

  try {
    const poll: null | DBPollPopulated = await PollModel.findOne({ linkCode: code })
      .populate({path: 'dates', model: DateChoiceModel})
      .populate({path: 'venues', model: VenueModel});

    // Calculate and rank the winners
    if (poll) {
      poll.dates = poll.dates.sort(function (a, b) { return b.votes - a.votes});
      poll.venues = poll.venues.sort(function (a, b) { return b.votes - a.votes});
    }
    res.status(200);
    res.json(poll);
  } catch (err) {
    console.log('Error finding poll with link code: ' + code, err);
  }
}