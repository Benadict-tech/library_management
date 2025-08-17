import { useState } from "react";
import "../Custom_css/modal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function Modal({ ModalOpen, AddBook }) {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [categoryName, setCategoryname] = useState("");

  const BASE_URL = "/api/"

  function save() {
    if (!bookName || !authorName || !categoryName) {
      return alert("enter all entities");
    }
    const books = {
      id: uuidv4(),
      name: bookName,
      author: authorName,
      category: categoryName,
      lentTo: null,
    };
    axios
      .post(` ${BASE_URL}books`, books)
      .then((res) => AddBook(res.data))
      .catch((err) => console.log(err));

    ModalOpen(false);
  }

  return (
    <div className="main-container">
      <div className="modal-box">
        <h2>BOOKS</h2>
        <input
          type="text"
          placeholder="Enter the book name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter the author name"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter the category"
          value={categoryName}
          onChange={(e) => setCategoryname(e.target.value)}
        />
        <button onClick={save}>Save</button>
      </div>
    </div>
  );
}
