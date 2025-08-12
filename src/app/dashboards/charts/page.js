"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../../Custom_css/chartpage.css";

export default function ChartsPage() {
  const [totalUser, setTotalUser] = useState("");
  const [totalBooks, setTotalBooks] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("users");
    if (user) {
      const users = JSON.parse(user);
      setTotalUser(users.length);
    }

    axios
      .get("http://localhost:3001/books")
      .then((res) => setTotalBooks(res.data.length))
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <div className="chart-main">
      <div className="chart-user">
        <h1>NO OF USERS</h1>
        <p>{totalUser}</p>
      </div>
      <div className="chart-books">
        <h1>NO OF BOOKS</h1>
        <p>{totalBooks}</p>
      </div>
    </div>
  );
}
