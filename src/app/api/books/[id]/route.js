import { NextResponse } from "next/server";
import { getBookById, updateBook, deleteBook } from "@/lib/db";

export async function GET(_request, { params }) {
  const { id } = params;
  const book = getBookById(id);

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }
  return NextResponse.json(book, { status: 200 });
}

export async function PUT(request, { params }) {
  const { id } = params;
  const payload = await request.json();

  const updated = updateBook(id, payload);
  if (!updated) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(_request, { params }) {
  const { id } = params;

  const deleted = deleteBook(id);
  if (!deleted) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "Deleted" }, { status: 200 });
}
