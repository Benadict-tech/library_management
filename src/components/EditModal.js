import { useState, useEffect } from "react";
import "../Custom_css/modal.css";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default function EditModal({ EditModalOpen, book, EditedBook }) {
  const [data, setData] = useState([]);
  const [editedBook, setEditedBook] = useState({
    name: "",
    author: "",
    category: "",
  });

  useEffect(() => {
    if (book) {
      setEditedBook({
        name: book.name,
        author: book.author,
        category: book.category,
      });
    }
  }, [book]);

  const BASE_URL = "http://localhost:3001/";

  function updateBook(id) {
    axios
      .put(`${BASE_URL}books/${id}`, editedBook)
      .then((res) => EditedBook(res.data, id))
      .catch((err) => console.log("console error", err));

    EditModalOpen(false);
  }

  return (
    <div className="main-container">
      <div className="modal-box">
        <h2>EDIT BOOKS</h2>
        <input
          type="text"
          placeholder="Enter the book name"
          value={editedBook.name}
          onChange={(e) =>
            setEditedBook({ ...editedBook, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Enter the author name"
          value={editedBook.author}
          onChange={(e) =>
            setEditedBook({ ...editedBook, author: e.target.value })
          }
        />

        <input
          type="text"
          placeholder="Enter the category"
          value={editedBook.category}
          onChange={(e) =>
            setEditedBook({ ...editedBook, category: e.target.value })
          }
        />
        <button onClick={() => updateBook(book.id)}>Update</button>
      </div>
    </div>
  );
}
