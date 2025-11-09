import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/styles/PanelStyles.css";

const ViewAdmissions = ({ user }) => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmissions = async () => {
      if (!user?.uid) return;
      try {
        const res = await fetch(`https://careerplatform-z4jj.onrender.com/students/admissions/${user.uid}`);
        const data = await res.json();
        if (data.success) setAdmissions(data.admissions);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdmissions();
  }, [user]);

  if (!user?.uid || loading) return <p>Loading...</p>;

  return (
    <div className="student-panel-container">
      <button className="back-btn" onClick={() => navigate("/dashboard/student")}>
        ← Back to Student Panel
      </button>
      <h2>My Applications & Results</h2>
      {admissions.length === 0 ? <p>No admissions found.</p> : (
        <div className="card-grid">
          {admissions.map((app) => (
            <div key={app.id} className="card">
              <h3>Course ID: {app.courseId}</h3>
              <p>Institution ID: {app.institutionId}</p>
              <p>Status: {app.status}</p>
              <p>Created At: {new Date(app.createdAt).toLocaleString()}</p>
              {app.admittedAt && <p>Admitted At: {new Date(app.admittedAt).toLocaleString()}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewAdmissions;
