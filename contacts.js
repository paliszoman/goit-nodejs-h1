const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

const readContactsFile = fs.readFile(contactsPath);

const showContactsList = () => {
  readContactsFile
    .then((file) => JSON.parse(file))
    .then((file) => console.table(file))
    .catch((err) => console.log(err.message));
};

const getContactById = (contactId) => {
  readContactsFile
    .then((file) => JSON.parse(file))
    .then((file) => file.find((contact) => contact.id === contactId))
    .then((contact) => console.table([contact]))
    .catch((err) => console.log(err.message));
};

const deleteContact = (contactId) => {
  readContactsFile
    .then((file) => JSON.parse(file))
    .then((file) => {
      const contacts = file;
      const idToRemove = contacts.findIndex(
        (contact) => contact.id === contactId
      );
      contacts.splice(idToRemove, 1);
      return contacts;
    })
    .then((file) => {
      fs.writeFile(contactsPath, JSON.stringify(file));
      return console.table(file);
    })
    .catch((err) => console.log(err.message));
};

const addContact = (name, email, phone) => {
  readContactsFile
    .then((file) => JSON.parse(file))
    .then((file) => {
      const jsonData = { id: Date.now().toString(), name, email, phone };
      file.splice(file.length, 0, jsonData);
      return file;
    })
    .then((file) => {
      fs.writeFile(contactsPath, JSON.stringify(file));
      return console.table(file);
    })
    .catch((err) => console.log(err.message));
};

module.exports = {
  showContactsList,
  getContactById,
  deleteContact,
  addContact,
};
