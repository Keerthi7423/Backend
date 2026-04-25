const fs = require("fs");

const getAllProducts = (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  const parsed = JSON.parse(data);

  res.json(parsed.products);
};

const getProductById = (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  const parsed = JSON.parse(data);

  const product = parsed.products.find(p => p.id == req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(product);
};

const addProduct = (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  const parsed = JSON.parse(data);

  if (!req.body.name || !req.body.price) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price
  };

  parsed.products.push(newProduct);

  fs.writeFileSync(
    "data/products.json",
    JSON.stringify(parsed, null, 2)
  );

  res.status(201).json(newProduct);
};

const deleteProduct = (req, res) => {
  const data = fs.readFileSync("data/products.json", "utf-8");
  const parsed = JSON.parse(data);

  parsed.products = parsed.products.filter(
    p => p.id != req.params.id
  );

  fs.writeFileSync(
    "data/products.json",
    JSON.stringify(parsed, null, 2)
  );

  res.json({ message: "Deleted" });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  deleteProduct
};