export type Venue = {
  name: String,
  latitude: Number,
  longitude: Number,
  photo: Photo,
  rating: String,
  num_reviews: Number,
  price_level: String,
  ranking: String,
  cuisine: Cuisine[],
}

type Photo = {
  images: {
    large: {
      url: string
    }
  }
}

type Cuisine = {
  name: string
}