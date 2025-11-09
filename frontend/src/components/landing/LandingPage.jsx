import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const roles = [
    { title: "Admin", path: "/admin/login" },
    { title: "Student", path: "/student/login" },
    { title: "Institute", path: "/institute/login" },
    { title: "Company", path: "/company/login" },
  ];

  return (
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="landing-title">Career Guidance Portal</h1>
        <p className="landing-subtitle">Select your role to continue</p>
      </header>

      <main className="role-grid">
        {roles.map((role, idx) => (
          <div
            key={idx}
            className="role-card"
            onClick={() => navigate(role.path)}
          >
            <h3 className="role-title">{role.title}</h3>
            <p className="role-description">
              Enter the {role.title} dashboard
            </p>
          </div>
        ))}
      </main>

      <footer className="landing-footer">
        <span>© {new Date().getFullYear()} Career Guidance Portal</span>
      </footer>
    </div>
  );
};

export default LandingPage;
