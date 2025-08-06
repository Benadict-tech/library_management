"use client";
import Modal from "@/components/Modal";
import { useEffect, useState } from "react";
import "../../../Custom_css/bookpage.css";
import axios from "axios";
import EditModal from "@/components/EditModal";

export default function BooksPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [data, setData] = useState([]);

  const BASE_URL = "http://localhost:3001/";
  useEffect(() => {
    axios
      .get(` ${BASE_URL}books/`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  function open() {
    setIsModalOpen(true);
  }
  function handleDelete(id) {
    axios
      .delete(` ${BASE_URL}books/${id}`)
      .then((res) => {
        setData((data) => data.filter((book) => book.id !== id));
      })
      .catch((err) => console.log(err));
  }
  function addNewBook(newbook) {
    setData((data) => [...data, newbook]);
  }
  function openEdit(data) {
    setSelectedBook(data);
    setIsEditModalOpen(true);
  }
  function addEditBook(editedBook, id) {
   

    setData((data) => [...data.filter((book) => book.id !== id), editedBook]);
  }

  return (
    <div className="main-box">
      <h3>Collection of Books</h3>
      <div className="book-container">
        <ul>
          {data.map((data, id) => {
            return (
              <li key={data.id} className="book-list">
                {data.name} by {data.author}
                <div>
                  <button onClick={() => openEdit(data)}>Edit</button>
                  <button onClick={() => handleDelete(data.id)}>Delete</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <button onClick={open} className="add-button">
        ADD BOOK
      </button>

      {isModalOpen && <Modal ModalOpen={setIsModalOpen} AddBook={addNewBook} />}
      {isEditModalOpen && (
        <EditModal
          EditModalOpen={setIsEditModalOpen}
          book={selectedBook}
          EditedBook={addEditBook}
        />
      )}
    </div>
  );
}
