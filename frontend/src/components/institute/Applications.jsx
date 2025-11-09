import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Applications = ({ user }) => {
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

  const updateStatus = async (appId, newStatus) => {
    try {
      const res = await fetch(
        `https://careerplatform-z4jj.onrender.com/institute/${user.institutionId}/admissions/${appId}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setApplications((prev) =>
          prev.map((app) => (app.id === appId ? { ...app, status: newStatus } : app))
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-main">
      <button className="back-btn" onClick={() => navigate("/dashboard/institute")}>
        ← Back to Institute Panel
      </button>
      <h1>Student Applications</h1>
      {loading && <p>Loading applications...</p>}
      {applications.length === 0 && !loading && <p>No applications found.</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Course Applied</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.studentName}</td>
              <td>{app.courseName}</td>
              <td>{app.status}</td>
              <td>
                {app.status === "pending" ? (
                  <>
                    <button onClick={() => updateStatus(app.id, "approved")}>Approve</button>
                    <button onClick={() => updateStatus(app.id, "rejected")}>Reject</button>
                  </>
                ) : (
                  <span>—</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Applications;
