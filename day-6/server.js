const express = require("express");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// middleware
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api", productRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});