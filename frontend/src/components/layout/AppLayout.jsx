import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/theme.css";

function AppLayout({ children }) {
  const location = useLocation();

  // Hide header/footer for dashboard routes
  const hideLayout =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/student/") ||
    location.pathname.startsWith("/institute/") ||
    location.pathname.startsWith("/admin/") ||
    location.pathname.startsWith("/company/");

  return (
    <div className="app-shell">
      {!hideLayout && (
        <header className="app-header">
          <div className="header-content">
            <Link to="/" className="brand">Career Guidance</Link>
            <nav className="nav">
              <Link className="nav-link" to="/student/login">Student</Link>
              <Link className="nav-link" to="/institute/login">Institute</Link>
              <Link className="nav-link" to="/admin/login">Admin</Link>
              <Link className="nav-link" to="/company/login">Company</Link>
            </nav>
          </div>
        </header>
      )}

      <main className="app-main">
        <div className="container">{children}</div>
      </main>

      {!hideLayout && (
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-left">
              <strong>Career Guidance</strong>
              <span>© {new Date().getFullYear()}</span>
            </div>
            <nav className="footer-right">
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
              <Link to="/privacy" className="footer-link">Privacy</Link>
            </nav>
          </div>
        </footer>
      )}
    </div>
  );
}

export default AppLayout;
