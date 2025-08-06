"use client";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../Custom_css/dashboardlayout.css";

const secret = "12345678";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = Cookies.get("jwt_token");
    const decoded = jwt.decode(token);
    //console.log("user type",decoded.role)

    if (!token) {
      alert("User not found");
      window.location.href="/"
      return;
    }

    try {
      const decode = jwt.verify(token, secret);
    } catch (err) {
      console.error("Invalid token in catch");
      Cookies.remove("jwt_token");
      router.push("/");
    }
  });

  return (
    <div>Progressing</div>
  );
}
