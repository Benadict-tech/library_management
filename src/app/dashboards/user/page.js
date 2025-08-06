"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const secret = "12345678";

export default function UserPage() {
  const router = useRouter();

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

  return (
    <div>
      <h1>User Management (Admin Only)</h1>
    </div>
  );
}
