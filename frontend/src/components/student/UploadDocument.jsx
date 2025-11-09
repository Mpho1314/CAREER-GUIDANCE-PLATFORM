import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/styles/PanelStyles.css";
import "../../components/styles/StudentUpload.css";

const UploadDocuments = ({ user }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => setFiles([...e.target.files]);

  const handleUpload = async () => {
    if (!user?.uid) return alert("Login first");
    if (files.length === 0) return alert("Select files");

    setLoading(true);
    try {
      const documentList = files.map((f) => f.name);
      const res = await fetch(`https://careerplatform-z4jj.onrender.com/students/${user.uid}/documents`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ documents: documentList }),
      });
      const data = await res.json();
      setMessage(data.success ? `✅ ${data.message}` : `❌ ${data.message}`);
      if (data.success) setFiles([]);
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Error uploading documents.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-page">
      <button className="back-btn" onClick={() => navigate("/dashboard/student")}>
        ← Back to Student Panel
      </button>
      <header className="page-header">
        <h2>Upload Documents</h2>
        <p className="muted">Attach your certificates and transcripts.</p>
      </header>
      <section className="surface">
        <div className="form-grid">
          <label htmlFor="docs">Select documents</label>
          <input id="docs" type="file" multiple onChange={handleFileChange} />
          <div className="actions">
            <button className="btn primary" onClick={handleUpload} disabled={loading}>
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
          {message && <p>{message}</p>}
        </div>
        {files.length > 0 && (
          <div className="selected-files">
            <h4>Selected Files</h4>
            <ul>{files.map((f, i) => <li key={i}>{f.name}</li>)}</ul>
          </div>
        )}
      </section>
    </div>
  );
};

export default UploadDocuments;
