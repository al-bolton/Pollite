import mongoose from 'mongoose';
import { DBVenue } from '../types/db/DBVenue.type';

const venueSchema = new mongoose.Schema<DBVenue>({
  name: String,
  latitude: Number,
  longitude: Number,
  imgUrl: String,
  rating: String,
  num_reviews: Number,
  price_level: String,
  ranking: String,
  cuisine: [String],
  votes: { type: Number, default: 0 }
});

export default mongoose.models.Venue || mongoose.model('Venue', venueSchema);