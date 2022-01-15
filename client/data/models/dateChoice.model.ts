import mongoose from 'mongoose';
import { DBDate } from '../types/db/DBDate.type';

const dateChoiceSchema = new mongoose.Schema<DBDate>({
  dateString: String,
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.models.DateChoice || mongoose.model('DateChoice', dateChoiceSchema);