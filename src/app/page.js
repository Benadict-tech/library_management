"use client";
import Link from "next/link";
import "../Custom_css/home.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIcon, setPasswordIcon] = useState(false);
  const router = useRouter();

  function click() {
    setPasswordIcon((passwordIcon) => !passwordIcon);
  }

  function login() {
    if (!email || !password) {
      alert("Fill all the entries");
      return "";
    }
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser =
      email === "admin@library.com" && password === "Admin@123"
        ? {
            firstName: "Admin",
            email: "admin@library.com",
            role: "admin",
          }
        : existingUser.find(
            (user) => user.email === email && user.password === password,
          );

    if (!matchedUser) {
      alert(
        " Email or password mismatch  (or)  Create a account for logging in",
      );
      setEmail("");
      setPassword("");

      return;
    }
    const secret = "12345678";
    const payload = { email: matchedUser.email, role: matchedUser.role };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });

    Cookies.set("jwt_token", token, { expires: 1 });

    router.push("/dashboards");
  }

  return (
    <div className="full-page">
      <div className="content-box">
        <h1 className="heading">WELCOME TO LIBRARY</h1>
        <input
          id="email"
          type="email"
          className="input-item"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="password-img">
          <input
            id="password"
            type={!passwordIcon ? "password" : "text"}
            className="input-item"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <img
            src={!passwordIcon ? "./password.png" : "./unlock.png"}
            id="pass-lock"
            onClick={click}
          ></img>
        </div>

        <button className="btw-login" onClick={login}>
          Login
        </button>
        <p className="forgot-password">forgot password?</p>
        <div className="sub-division">
          <p className="create-account">
            Create Account &nbsp;{" "}
            <span>
              {" "}
              <Link href="/signuppage" className="signup-link">
                {" "}
                SIGN UP
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
