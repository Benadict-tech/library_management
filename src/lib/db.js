import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "src", "db.json");

export function readDB() {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
}

export function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

export function getBooks() {
  const db = readDB();
  return db.books || [];
}

export function addBook(newBook) {
  const db = readDB();
  db.books = db.books || [];
  db.books.push(newBook);
  writeDB(db);
}

export function getBookById(id) {
  const db = readDB();
  return db.books?.find((book) => book.id === id) || null;
}

export function updateBook(id, updatedFields) {
  const db = readDB();
  const index = db.books.findIndex((book) => book.id === id);
  if (index === -1) return null;

  db.books[index] = { ...db.books[index], ...updatedFields };
  writeDB(db);
  return db.books[index];
}

export function deleteBook(id) {
  const db = readDB();
  const index = db.books.findIndex((book) => book.id === id);
  if (index === -1) return false;

  db.books.splice(index, 1);
  writeDB(db);
  return true;
}

