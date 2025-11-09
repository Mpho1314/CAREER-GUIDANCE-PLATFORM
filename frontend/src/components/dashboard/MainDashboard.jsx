import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../components/styles/Dashboard.css";
import { FaUser } from "react-icons/fa";

const MainDashboard = ({ user }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/"); // redirect if not logged in
  }, [user, navigate]);

  if (!user) return null;

  const { role, name } = user;

  // Role-based menu items
  const menuItems = {
    admin: [
      { name: "Manage Institutions", path: "/admin/institutions" },
      { name: "Manage Faculties", path: "/admin/faculties" },
      { name: "Manage Courses", path: "/admin/courses" },
      { name: "View Reports", path: "/admin/reports" },
      { name: "Manage Companies", path: "/admin/companies" },
    ],
    institute: [
      { name: "Add Faculty", path: "/institute/faculties" },
      { name: "Add Courses", path: "/institute/courses" },
      { name: "Student Applications", path: "/institute/applications" },
      { name: "Publish Admissions", path: "/institute/admissions" },
    ],
    student: [
      { name: "Apply for Course", path: "/student/apply-course" },
      { name: "Upload Documents", path: "/student/upload-document" },
      { name: "Profile", path: "/student/profile" },
      { name: "Admissions Results", path: "/student/admissions" },
      { name: "Job Notifications", path: "/student/jobs" },
    ],
    company: [
      { name: "Post Opportunities", path: "/company/post-job" },
      { name: "View Applications", path: "/company/applications" },
    ],
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar for all roles */}
      <aside className="sidebar">
        <div className="logo">{role.toUpperCase()} PANEL</div>
        <div className="sidebar-nav">
          {menuItems[role].map((item) => (
            <Link key={item.path} to={item.path} className="nav-link">
              {item.name}
            </Link>
          ))}
        </div>
        <button className="logout-btn" onClick={() => navigate("/")}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="content-card welcome-card">
          <div className="welcome-header">
            <FaUser size={36} className="user-icon" />
            <h2>Welcome, {name}!</h2>
          </div>
          <p>Select an option from the sidebar to get started.</p>
        </div>
      </main>
    </div>
  );
};

export default MainDashboard;
