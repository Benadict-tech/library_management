"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import "../../../Custom_css/userpage.css";

const secret = "12345678";

export default function UserPage() {
  const router = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = Cookies.get("jwt_token");

    if (!token) {
      alert("No token found");
      router.push("/");
      return;
    }

    try {
      const decoded = jwt.verify(token, secret);
      if (decoded.role !== "admin") {
        alert("Access Denied: Admins only");
        router.push("/dashboards");
      }
    } catch (err) {
      console.error("Invalid token");
      Cookies.remove("jwt_token");
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("users"));
    setData(details);
  }, []);

  function handleDelete(email) {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const updatedUsers = storedUsers.filter((user) => user.email !== email);

    console.log(updatedUsers);

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setData(updatedUsers);
  }

  return (
    <div>
      {data.map((user) => (
        <div className="user-box" key={user.email}>
          <p>
            Name:{user.firstName} {user.lastName} Email:{user.email}
          </p>
          <button onClick={() => handleDelete(user.email)}>Clear User</button>
        </div>
      ))}
    </div>
  );
}
