import mongoose from 'mongoose';

import { DBVenue } from 'data/types/db/DBVenue.type';
import { DBDate } from 'data/types/db/DBDate.type';


export type DBPoll = {
  title: String,
  dates: mongoose.Types.ObjectId[],
  venues: mongoose.Types.ObjectId[],
  linkCode: String
};

export type DBPollPopulated = {
  title: String,
  dates: DBDate[],
  venues: DBVenue[],
  linkCode: String
}