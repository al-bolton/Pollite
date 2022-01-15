import mongoose from 'mongoose';
import { DBPoll } from '../types/db/DBPoll.type';

const pollSchema = new mongoose.Schema<DBPoll>({
  title: String,
  dates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'DateChoice' },],
  venues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Venue' }],
  linkCode: String
});

export default mongoose.models.Poll || mongoose.model('Poll', pollSchema);