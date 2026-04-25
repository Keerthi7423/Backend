const express = require("express");
const app = express();

const productRoutes = require("./routes/productRoutes");

app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// use routes
app.use("/", productRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});