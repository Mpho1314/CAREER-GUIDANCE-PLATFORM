import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentApplications = ({ user }) => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.institutionId) return;

    const fetchApplications = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://careerplatform-z4jj.onrender.com/institute/${user.institutionId}/applications`
        );
        const data = await res.json();
        if (data.success) setApplications(data.applications);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user]);

  return (
    <div className="dashboard-main">
      <button className="back-btn" onClick={() => navigate("/dashboard/institute")}>
        ← Back to Institute Panel
      </button>
      <h2>Student Applications</h2>
      {loading && <p>Loading applications...</p>}
      {applications.length === 0 && !loading && <p>No student applications available.</p>}
      <ul>
        {applications.map((app) => (
          <li key={app.id}>
            <strong>{app.studentName}</strong> applied for <em>{app.courseName}</em> — Status: {app.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentApplications;
