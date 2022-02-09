const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contactsArray = JSON.parse(data);
  return contactsArray;
};

const getContactById = async (contactId) => {
  const contactsArray = await listContacts();
  const contact = contactsArray.find((contact) => contact.id === contactId);
  if (!contact) {
    return null;
  }
  return contact;
};

const removeContact = async (contactId) => {
  const contactsArray = await listContacts();
  const removedById = contactsArray.find((contact) => contact.id === contactId);
  if (!removedById) {
    return null;
  }
  const contactsAfterRemoval = contactsArray.filter(
    (contact) => contact.id !== contactId
  );
  await updateContacts(contactsAfterRemoval);

  return removedById;
};

const addContact = async (name, email, phone) => {
  const contactsArray = await listContacts();
  const contactIds = contactsArray.map((contact) => Number(contact.id));
  const newId = Math.max(...contactIds) + 1;
  const newContact = {
    id: newId.toString(),
    name,
    email,
    phone,
  };
  await updateContacts(contactsArray);
  return newContact;
};

const contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};

module.exports = contacts;
