import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/styles/PanelStyles.css";

const JobNotifications = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user?.uid) return;
      setLoading(true);
      try {
        const res = await fetch(`https://careerplatform-z4jj.onrender.com/students/${user.uid}/job-notifications`);
        const data = await res.json();
        if (data.success) setJobs(data.jobs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [user]);

  return (
    <div className="student-panel-container">
      <button className="back-btn" onClick={() => navigate("/dashboard/student")}>
        ← Back to Student Panel
      </button>
      <h2>Job Notifications</h2>
      {loading && <p>Loading...</p>}
      {!loading && jobs.length === 0 && <p>No opportunities found.</p>}
      <div className="card-grid">
        {jobs.map((job) => (
          <div key={job.id} className="card">
            <h3>{job.title}</h3>
            <p>Company ID: {job.companyId || "N/A"}</p>
            <p>Qualifications:</p>
            <ul>
              <li>Academic Performance: {job.qualifications?.academicPerformance || "N/A"}</li>
              <li>Certificates: {job.qualifications?.certificates || "N/A"}</li>
              <li>Work Experience: {job.qualifications?.workExperience || "N/A"}</li>
              <li>Relevance: {job.qualifications?.relevance?.join(", ") || "N/A"}</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobNotifications;
