import type { NextApiRequest, NextApiResponse } from 'next';
import mongoose from 'mongoose';

const PollModel = mongoose.model('Poll');
import { dbConnect } from '../../../../lib/dbConnect';

export default async function viewPoll(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  await dbConnect();

  try {
    const poll = await PollModel.findOne({ linkCode: code })
      .populate('dates')
      .populate('venues');

    res.status(200);
    res.json(poll);
  } catch (err) {
    console.log('Error finding poll with link code: ' + code, err);
  }
}