const express = require("express");
const fs = require("fs");

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Middleware logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("Products API Running 🚀");
});

// GET ALL PRODUCTS
app.get("/products", (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  const products = JSON.parse(data);

  res.json(products);
});

// GET SINGLE PRODUCT
app.get("/products/:id", (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  const products = JSON.parse(data);

  const product = products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// ADD PRODUCT
app.post("/products", (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  let products = JSON.parse(data);

  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price
  };

  products.push(newProduct);

  fs.writeFileSync("data/products.json", JSON.stringify(products, null, 2));

  res.status(201).json(newProduct);
});

// DELETE PRODUCT
app.delete("/products/:id", (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  let products = JSON.parse(data);

  const updated = products.filter(p => p.id != req.params.id);

  fs.writeFileSync("data/products.json", JSON.stringify(updated, null, 2));

  res.json({ message: "Product deleted" });
});

// START SERVER
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});