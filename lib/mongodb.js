import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MONGO");
  } catch (err) {
    console.log("Error while connecting to MONGO DB:", err);
  }
};
