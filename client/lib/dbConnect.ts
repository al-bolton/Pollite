/* import mongoose from 'mongoose';
import _ from 'lodash';

const { DATABASE_URL } = process.env

export const dbConnect = async () => {

  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return;
  } else {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
    }
    await mongoose
    .connect(DATABASE_URL, options)
    .catch(err => console.log(err))
    console.log("Mongoose Connection Established");

    require('../data/models/poll.model');
    require('../data/models/dateChoice.model');
    require('../data/models/venue.model');
  }
}; */

import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL;

declare global {
  var mongoose: any
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      useUnifiedTopology: true,
    }

    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      )
    }

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

export default dbConnect