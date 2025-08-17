import { NextResponse } from "next/server";
import { getBooks, addBook } from "@/lib/db";

export async function GET() {
  const books = getBooks();

  return NextResponse.json(books, { status: 200 });
}


export async function POST(request) {
  
  const body = await request.json();

 
  const { name, author, category, lentTo = null } = body || {};
  if (!name || !author || !category) {
    return NextResponse.json(
      { message: "name, author, and category are required" },
      { status: 400 }
    );
  }
    const id = crypto.randomUUID(); 
  const newBook = { id, name, author, category, lentTo };

 
  addBook(newBook);

  
  return NextResponse.json(newBook, { status: 201 }) ;
}