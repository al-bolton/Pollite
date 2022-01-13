export type Venue = {
  name: String,
  latitude: Number,
  longitude: Number,
  photo: Photo,
  ratingString: String,
  num_reviews: Number,
  priceLevel: String,
  ranking: String,
  cuisine: String[],
}

type Photo = {
  images: {
    large: {
      url: string
    }
  }
}