import mongoose from 'mongoose';

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
    console.log("Mongoose Connection Established")
  }
}