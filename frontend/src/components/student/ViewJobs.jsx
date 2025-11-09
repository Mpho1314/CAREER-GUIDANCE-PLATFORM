import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/styles/PanelStyles.css";
import { auth } from "../../firebase/config";

const ViewJobs = ({ user }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getStudentId = () => user?.uid || auth.currentUser?.uid || null;

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://careerplatform-z4jj.onrender.com/students/opportunities");
        const data = await res.json();
        if (data.success) setJobs(data.jobs);
        else setError(data.message);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleApply = async (jobId) => {
    const studentId = getStudentId();
    if (!studentId) return alert("Login to apply");

    try {
      const res = await fetch("https://careerplatform-z4jj.onrender.com/students/apply-job", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId, jobId }),
      });
      const data = await res.json();
      alert(data.message || "Applied successfully!");
    } catch (err) {
      console.error(err);
      alert(err.message || "Apply failed");
    }
  };

  return (
    <div className="student-panel-container">
      <button className="back-btn" onClick={() => navigate("/dashboard/student")}>
        ← Back to Student Panel
      </button>
      <h2>Available Jobs</h2>
      {loading && <p>Loading jobs...</p>}
      {!loading && jobs.length === 0 && <p>No jobs available.</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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
            <button disabled={!getStudentId()} onClick={() => handleApply(job.id)}>
              {getStudentId() ? "Apply" : "Login to Apply"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewJobs;
