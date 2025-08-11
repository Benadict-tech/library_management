"use client";
import Link from "next/link";
import "../../Custom_css/dashboardlayout.css";

import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

export default function DashboardLayout({ children }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("jwt_token");
    const decoded = jwt.decode(token);
    if (!token) {
      alert("No token found");
      window.location.href = "/";
      return;
    }
    if (decoded?.role) {
      setRole(decoded.role);
    }
  }, []);
  function handleLogout() {
    Cookies.remove("jwt_token");
    window.location.href = "/";
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h3> Library</h3>

        <div>
          <Link href="/dashboards/books">Books</Link>
        </div>
        <div>
          <Link href="/dashboards/lend">Lend Book</Link>
        </div>
        <div>
          <Link href="/dashboards/charts">Charts</Link>
        </div>

        {role === "admin" && (
          <>
            <div>
              <Link href="/dashboards/user">Users</Link>
            </div>
          </>
        )}

        <button onClick={handleLogout}>Logout</button>
      </aside>

      <main className="dashboard-main">{children}</main>
    </div>
  );
}
