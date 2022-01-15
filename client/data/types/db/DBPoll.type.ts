import mongoose from 'mongoose';

export type DBPoll = {
  title: String,
  dates: mongoose.Types.ObjectId[],
  venues: mongoose.Types.ObjectId[],
  linkCode: String
};