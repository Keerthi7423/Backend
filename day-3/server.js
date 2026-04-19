const http = require("http");
const users = require("./data");

const server = http.createServer((req, res) => {

  // HOME ROUTE
  if (req.url === "/" && req.method === "GET") {
    res.end("Welcome to My Server 🚀");
  }

  // ABOUT ROUTE
  else if (req.url === "/about" && req.method === "GET") {
    res.end("This is About Page");
  }

  // USERS API
  else if (req.url === "/users" && req.method === "GET") {
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(users));
  }

  // 404 ROUTE
  else {
    res.statusCode = 404;
    res.end("404 Not Found ❌");
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});