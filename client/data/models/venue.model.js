module.exports = function Venue(mongoose) {
  const venueSchema = new mongoose.Schema({
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

  return mongoose.model('Venue', venueSchema);
}