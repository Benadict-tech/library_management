"use client";
import Link from "next/link";
import "../../Custom_css/signup.css";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const router = useRouter();

  function add() {
    const user = { firstName, lastName, email, password ,role:"user",borrowedBooks:[]};
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      alert("Enter the entities");
      return "";
    }
    const nameFormat = /^[a-zA-Z -]*$/;

    if (!nameFormat.test(firstName)) {
      alert("Enter valid First Name ");
      return;
    }

    if (!nameFormat.test(lastName)) {
      alert("Enter valid Last Name ");
      return;
    }
    const emailFormat =
      /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!emailFormat.test(email)) {
      alert("Invalid Email");
      return;
    }
    const passwordFormat =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordFormat.test(password)) {
      alert("Invalid Password  ");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordMatch(true);
      alert("Password Mismatch");
      return;
    }

    if (localStorage.getItem("users")) {
      const userData = JSON.parse(localStorage.getItem("users"));
      userData.push(user);
      localStorage.setItem("users", JSON.stringify(userData));
    } else {
      localStorage.setItem("users", JSON.stringify([user]));
    }

    /*setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");*/
    
    router.push("/");
  }

  return (
    <div className="sign-full-page">
      <div className="sign-content-box">
        <h1 className="sign-heading">JOIN OUR COMMUNITY</h1>
        <input
          id="sign-firstname"
          type="text"
          value={firstName}
          className="sign-input-item"
          placeholder="Enter your firstname"
          onChange={(e) => setFirstName(e.target.value)}
          required
        ></input>
        <input
          id="sign-lastname"
          type="text"
          className="sign-input-item"
          placeholder="Enter your lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        ></input>
        <input
          id="sign-email"
          type="email"
          className="sign-input-item"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></input>
        <input
          id="sign-password"
          type="password"
          className="sign-input-item"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></input>
        <input
          id="sign-confirm-password"
          type="password"
          className="sign-input-item"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        ></input>
        <button id="sign-btw" className="sign-btw-login" onClick={add}>
          Sign Up
        </button>
        <p className="sign-forgot-password">Sign Up with Google</p>
        <div className="sub-division">
          <p className="sign-exist-account">
            Already a User? &nbsp;{" "}
            <span>
              {" "}
              <Link href="/" className="home-link">
                {" "}
                Login
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
