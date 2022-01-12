module.exports = function Venue(mongoose) {
  const venueSchema = new mongoose.Schema({
    name: String,
    lat: Number,
    lng: Number,
    // imgUrl: String,
    // ratingString: String,
    // numReviews: Number,
    // priceLevel: String,
    // ranking: String,
    // cuisine: [String]
  });

  return mongoose.model('Venue', venueSchema);
}