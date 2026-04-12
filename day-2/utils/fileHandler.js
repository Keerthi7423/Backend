const fs = require("fs");

const readContacts = () => {
  const data = fs.readFileSync("data/contacts.json", "utf-8");
  return JSON.parse(data);
};

const writeContacts = (contacts) => {
  fs.writeFileSync(
    "data/contacts.json",
    JSON.stringify(contacts, null, 2)
  );
};

module.exports = { readContacts, writeContacts };