const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://kumarkeerthi456_db_user:1234@free.cxwi6yf.mongodb.net/productsDB"
    );

    console.log("MongoDB Connected ✅");
  } catch (err) {
    console.log("DB Error:", err);
  }
};

module.exports = connectDB;