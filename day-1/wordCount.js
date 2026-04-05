const fs = require("fs");

const data = fs.readFileSync("test.txt", "utf-8");
const words = data.split(" ");

console.log("Word count:", words.length);