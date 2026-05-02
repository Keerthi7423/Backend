const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const data = fs.readFileSync("data/users.json", "utf-8");
  let users = JSON.parse(data);

  const existingUser = users.find(
    user => user.email === email
  );

  if (existingUser) {
    return res.status(400).json({
      message: "User already exists"
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: Date.now(),
    name,
    email,
    password: hashedPassword,
    role: role || "user"
  };

  users.push(newUser);

  fs.writeFileSync(
    "data/users.json",
    JSON.stringify(users, null, 2)
  );

  res.status(201).json({
    message: "User registered successfully"
  });
};


// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const data = fs.readFileSync("data/users.json", "utf-8");
  const users = JSON.parse(data);

  const user = users.find(
    user => user.email === email
  );

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token
  });
};


// PROFILE
const getProfile = (req, res) => {
  const data = fs.readFileSync("data/users.json", "utf-8");
  const users = JSON.parse(data);

  const user = users.find(
    user => user.id === req.user.id
  );

  res.json(user);
};


// ADMIN ONLY DELETE USER
const deleteUser = (req, res) => {
  const data = fs.readFileSync("data/users.json", "utf-8");
  let users = JSON.parse(data);

  users = users.filter(
    user => user.id != req.params.id
  );

  fs.writeFileSync(
    "data/users.json",
    JSON.stringify(users, null, 2)
  );

  res.json({
    message: "User deleted by admin"
  });
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  deleteUser
};