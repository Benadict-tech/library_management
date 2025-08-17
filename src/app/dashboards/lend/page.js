"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import LentedBook from "@/components/LentedBook";
import LentDetails from "@/components/LentDetails";
import "../../../Custom_css/lendpage.css";

export default function LendPage() {
  const [books, setBooks] = useState([]);
  const [userEmail, setUserEmail] = useState("");
  const [isLentedBookOpen, setIsLentedBookOpen] = useState(false);
  const [isLentedBookDetailsOpen, setIsLentedBookDetailsOpen] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [userName, setUserName] = useState("");
  const [search, setSearch] = useState("");
  //const [bookLength,setBookLength] =useState(null)

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    const decoded = jwt.decode(token);

    setUserEmail(decoded.email);
    setUserRole(decoded.role);
    setUserName(decoded.name);
  }, []);
  /* useEffect(()=>{
    setBookLength(books.length)
  },[books])*/

  const BASE_URL = "/api/";
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
  function openLentDetails() {
    setIsLentedBookDetailsOpen(true);
  }

  return (
    <div className="main-container-full">
      <input
        type="text"
        placeholder="Enter the book for searching"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="search-bar"
      />
      <div className="card-container">
        {books
          .filter(
            (book) =>
              !book.lentTo &&
              book.name.toLowerCase().includes(search.toLowerCase()),
          )
          .map((book, index) => (
            <div className="card" key={index}>
              <div>
                <img className="card-image" alt=""></img>
              </div>
              <div className="card-content">
                <p>{book.name}</p>
                {userRole === "user" && (
                  <button className="button" onClick={() => handleLent(book)}>
                    LENT
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>

      {userRole === "user" && (
        <button className="button button-book" onClick={openLentedBook}>
          LENTED BOOKS
        </button>
      )}
      {userRole === "admin" && (
        <button className="button button-book" onClick={openLentDetails}>
          LENT DETAILS
        </button>
      )}

      {isLentedBookOpen && (
        <LentedBook
          closeLentedModal={setIsLentedBookOpen}
          update={Update}
          booksData={books}
        />
      )}
      {isLentedBookDetailsOpen && (
        <LentDetails
          closeLentedDetailsModal={setIsLentedBookDetailsOpen}
          booksData={books}
        ></LentDetails>
      )}
    </div>
  );
}
