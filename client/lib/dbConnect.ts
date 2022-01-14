import mongoose from 'mongoose';

const { DATABASE_URL } = process.env

export const dbConnect = async () => {

  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return;
  } else {
    await mongoose
    .connect(DATABASE_URL)
    .catch(err => console.log(err))
    console.log("Mongoose Connection Established")
  }
}