"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import LentedBook from "@/components/LentedBook";
import "../../../Custom_css/lendpage.css";

export default function LendPage() {
  const [books, setBooks] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isLentedBookOpen, setIsLentedBookOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    const decoded = jwt.decode(token);

    setUserEmail(decoded.email);
  }, []);

  const BASE_URL = "http://localhost:3001/";
  useEffect(() => {
    axios
      .get(`${BASE_URL}books/`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLent(book) {
    const lentedBook = { ...book, lentTo: userEmail };
    axios
      .put(`${BASE_URL}books/${book.id}`, lentedBook)
      .then((res) => {
        const updatedBook = res.data;
        setBooks(books.map((b) => (b.id === book.id ? updatedBook : b)));
      })
      .catch((err) => console.log(err));
  }
  function openLentedBook() {
    setIsLentedBookOpen(true);
  }
  function Update(books) {
    setBooks(books);
  }

  return (
    <div className="main-container-full">
      <div className="card-container">
        {books
          .filter((book) => !book.lentTo)
          .map((book, index) => {
            return (
              <div className="card" key={index}>
                <div>
                  <img className="card-image"></img>
                </div>
                <div className="card-content">
                  <p>{book.name}</p>
                  <button
                    className="button"
                    onClick={() => handleLent(book)}
                  >
                    LENT
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <button className="button button-book" onClick={openLentedBook}>
        LENTED BOOKS
      </button>
      {isLentedBookOpen && (
        <LentedBook closeLentedModal={setIsLentedBookOpen} update={Update} booksData={books} />
      )}
    </div>
  );
}
