import React, { useEffect, useState } from "react";

export default function Reports() {
  const [reports, setReports] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("https://careerplatform-z4jj.onrender.com/admin/reports");
        const data = await res.json();
        if (data.success) setReports(data.reports);
      } catch (err) {
        console.error("Error fetching reports:", err);
      }
    };
    fetchReports();
  }, []);

  if (!reports) return <p>Loading reports...</p>;

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backBtn} onClick={() => window.history.back()}>
        ← Back
      </button>

      <h2 style={styles.title}>📊 System Reports</h2>

      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Students</h3>
          <p>{reports.totalStudents}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Institutions</h3>
          <p>{reports.totalInstitutions}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Companies</h3>
          <p>{reports.totalCompanies}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Jobs</h3>
          <p>{reports.totalJobs}</p>
        </div>
        <div style={styles.card}>
          <h3>Total Applications</h3>
          <p>{reports.totalApplications}</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  },
  backBtn: {
    display: "inline-block",
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#00bfa6",
    color: "white",
    cursor: "pointer",
  },
  title: {
    marginBottom: "1.5rem",
    color: "#00bfa6",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1.5rem",
  },
  card: {
    background: "linear-gradient(135deg, #00bfa6, #0077b6)",
    color: "white",
    borderRadius: "15px",
    padding: "1.5rem",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
};
