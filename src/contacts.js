import { v4 as uuidv4 } from "uuid";
import { readFile, writeFile } from "node:fs/promises";
import * as path from "node:path";

const contactsPath = process.cwd().includes("src")
  ? path.resolve("db", "contacts.json")
  : path.resolve("src", "db", "contacts.json");

async function updateContacts(contacts) {
  await writeFile(contactsPath, JSON.stringify(contacts, null, 2), "utf-8");
}

export async function listContacts() {
  try {
    const data = await readFile(contactsPath);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log(error.message);
  }
}

export async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await listContacts();
    if (data?.length === 0) return null;
    const contact = data?.find(({ id }) => id === contactId);
    return contact || null;
  } catch (error) {
    console.log(error.message);
  }
}

export async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  try {
    const data = await listContacts();
    if (data?.length === 0) return null;
    const index = data?.findIndex(({ id }) => id === contactId);
    if (index === -1) return null;
    const [contact] = data?.splice(index, 1);
    await updateContacts(data);
    return contact;
  } catch (error) {
    console.log(error.message);
  }
}

export async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  try {
    const data = await listContacts();
    const newContact = { id: uuidv4(), name, email, phone };
    data.push(newContact);
    await updateContacts(data);
    return newContact;
  } catch (error) {
    console.log(error.message);
  }
}
