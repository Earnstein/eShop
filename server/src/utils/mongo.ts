import mongoose from "mongoose";
import "colorts/lib/string";

const MONGO_URI = Bun.env.MONGO_URI!;

mongoose.connection.on("error", (err) => {
  console.error(`ERROR: ${err}`.red.inverse);
});

export async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected".blue.underline);
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`.red.inverse);
  }
}

export async function mongoDisconnect() {
  await mongoose.connection.close();
  console.log("MongoDB disconnected".red.underline);
}
