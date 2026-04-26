const Product = require("../models/Product");

// GET ALL PRODUCTS
const getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// GET SINGLE PRODUCT
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(product);
};

// ADD PRODUCT
const addProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();

  res.status(201).json(product);
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(updated);
};

// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct
};