import type { NextApiRequest, NextApiResponse } from 'next';

import db from '../../../../data/models/index.model';
import { dbConnect } from '../../../../lib/dbConnect';

export default async function viewPoll(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  await dbConnect();

  try {
    const poll = await db.Poll.findOne({ linkCode: code })
      .populate('dates')
      .populate('venues');

      console.log(poll);


    res.status(200);
    res.json(poll);
  } catch (err) {
    console.log('Error finding poll with link code: ' + code, err);
  }
}