import mongoose from 'mongoose';
import { DBPoll } from '../types/db/DBPoll.type';


const pollSchema = new mongoose.Schema<DBPoll>({
  title: String,
  dates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DateChoice' },],
  venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }],
  linkCode: String
});

module.exports = mongoose.model('Poll', pollSchema);