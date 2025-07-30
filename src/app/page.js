"use client";
import Link from "next/link";
import "../CustomCss/home.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();

  function login() {
    if(!email||!password){
      alert("Fill all the entries")
      return""
    }
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];

    const matchedUser= existingUser.find((user)=>user.email===email&&user.password===password)
    

    if (!matchedUser){
      alert(" Email or password mismatch  (or)  Create a account for logging in")
      setEmail("")
      setPassword("")
      
      return

    }
    
    router.push("/Dashboard")
  
    
    
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
        ></input>
        <input
          id="password"
          type="password"
          className="input-item"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="btw-login" onClick={login}>
          Login
        </button>
        <p className="forgot-password">forgot password?</p>
        <div className="sub-division">
          <p className="create-account">
            Create Account &nbsp;{" "}
            <span>
              {" "}
              <Link href="/SignUpPage" className="signup-link">
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
