export type DBVenue = {
  name: String,
  latitude: Number,
  longitude: Number,
  imgUrl: String,
  rating: String,
  num_reviews: Number,
  price_level: String,
  ranking: String,
  cuisine: String[],
  votes?: Number,
};