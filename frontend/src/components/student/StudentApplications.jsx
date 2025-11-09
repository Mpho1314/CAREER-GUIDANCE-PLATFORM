import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/styles/PanelStyles.css";

const StudentApplications = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user?.uid) {
        console.warn("No user logged in. Cannot fetch applications.");
        return;
      }

      setLoading(true);

      try {
        const res = await fetch(
          `https://careerplatform-z4jj.onrender.com/students/${user.uid}/applications`
        );
        const data = await res.json();

        if (data.success) {
          setApplications(data.applications);
          console.log("Student applications fetched:", data.applications);
        } else {
          console.error("Failed to fetch applications:", data.message);
          setApplications([]);
        }
      } catch (err) {
        console.error("Error fetching student applications:", err);
        setApplications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  if (!user) return <p>Loading user data...</p>;

  return (
    <div className="student-panel-container">
      <button className="back-btn" onClick={() => navigate("/dashboard/student")}>
        ← Back to Student Panel
      </button>

      <h2>My Applications</h2>

      {loading && <p>Loading applications...</p>}
      {!loading && applications.length === 0 && <p>No applications found.</p>}

      <div className="card-grid">
        {applications.map((app) => (
          <div className="card" key={app.id}>
            <h3>{app.courseName}</h3>
            <p>Institution: {app.institutionName || app.institutionId}</p>
            <p>Status: <strong>{app.status}</strong></p>
            <p>Applied At: {new Date(app.createdAt).toLocaleString()}</p>
            {app.admittedAt && <p>Admitted At: {new Date(app.admittedAt).toLocaleString()}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentApplications;
