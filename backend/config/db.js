const mongoose = require("mongoose");
require("dotenv").config();
const config = require("config");

const connectDB = async () => {
  try {
    const dbURI = config.get("db.uri");
    await mongoose.connect(process.env.MONGODB_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
