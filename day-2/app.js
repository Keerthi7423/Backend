const { readContacts, writeContacts } = require("./utils/fileHandler");

const command = process.argv[2];
const name = process.argv[3];
const phone = process.argv[4];

let contacts = readContacts();

// ADD
if (command === "add") {
  if (!name || !phone) {
    console.log("Invalid input ❌");
    return;
  }

  const exists = contacts.find(c => c.name === name);
  if (exists) {
    console.log("Contact already exists ❌");
    return;
  }

  contacts.push({ name, phone });
  writeContacts(contacts);
  console.log("Contact added ✅");
}

// LIST
else if (command === "list") {
  console.log(contacts);
}

// DELETE
else if (command === "delete") {
  const updated = contacts.filter(c => c.name !== name);
  writeContacts(updated);
  console.log("Contact deleted ❌");
}