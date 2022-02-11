export type Venue = {
  name: String,
  latitude: number,
  longitude: number,
  photo?: Photo,
  rating: String,
  num_reviews: Number,
  price_level: String,
  ranking: String,
  cuisine: Cuisine[],
  imgUrl?: string,
  phone: string,
  website: string,
  address: string
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