import Link from "next/link";
import "../CustomCss/home.css";

export default function Home() {
  return (
    <div className="full-page">
      <div className="content-box">
        <h1 className="heading">WELCOME TO LIBRARY</h1>
        <input
          id="email"
          type="email"
          className="input-item"
          placeholder="Enter your email"
        ></input>
        <input
          id="password"
          type="password"
          className="input-item"
          placeholder="Enter your password"
        ></input>
        <button className="btw-login">Login</button>
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
