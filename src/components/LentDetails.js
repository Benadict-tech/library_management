"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "../Custom_css/lentmodal.css";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export default function LentedBook({ closeLentedDetailsModal, booksData }) {
  const [books, setBooks] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    const decoded = jwt.decode(token);

    setUserEmail(decoded.email);
  }, []);

  useEffect(() => {
    if (!booksData?.length) {
      return;
    }
    setBooks(booksData);
  }, [booksData]);

  

  function closeLentedBook() {
    closeLentedDetailsModal(false);
  }
  
  return (
    <div className="main-container">
      <div className="book-page">
        <h3 className="book-heading">Lented Books</h3>
        <div className="book-container">
          {books
            .filter((data) => !!data.lentTo)
            .map((data, index) => {
              return (
                <div key={index} className="book-list-modal">
                  <img className="book-image" alt=""></img>
                  {data.name} by {data.author}
                  <p>
                    `Rented by <spam className="user-mail">{data.lentTo}</spam>`
                  </p>
                </div>
              );
            })}
        </div>
        <button className="button btw" onClick={closeLentedBook}>
          Close
        </button>
      </div>
    </div>
  );
}
