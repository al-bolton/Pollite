module.exports = function Venue(mongoose) {
  const venueSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    imgUrl: String,
    ratingString: String,
    numReviews: Number,
    priceLevel: String,
    ranking: String,
    cuisine: [String],
    votes: { type: Number, default: 0 }
  });

  return mongoose.model('Venue', venueSchema);
}