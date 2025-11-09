import React, { useState } from "react";
import { Link } from "react-router-dom";

function RegisterInstitute() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [verificationLink, setVerificationLink] = useState(""); 
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://careerplatform-z4jj.onrender.com/institute/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        setVerificationLink(data.emailVerificationLink);
        setMessage("✅ Institute registered successfully! Verify your email before login.");
      } else {
        setMessage("❌ " + data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("⚠️ Unable to register institute.");
    } finally {
      setLoading(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(verificationLink);
    alert("Verification link copied to clipboard!");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register Institution</h1>

      <form style={styles.form} onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Institution Name"
          required
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Institution Email"
          required
          value={formData.email}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="address"
          placeholder="Institution Address"
          required
          value={formData.address}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="password"
          name="password"
          placeholder="Set Password"
          required
          value={formData.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.primaryBtn} disabled={loading}>
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>

      {message && <p style={styles.message}>{message}</p>}

      {verificationLink && (
        <div style={styles.verifySection}>
          <p>✅ Please verify your email before logging in.</p>
          <p>Click below to verify your email:</p>
          <a
            href={verificationLink}
            target="_blank"
            rel="noopener noreferrer"
            style={styles.verifyLink}
          >
            Verify Email
          </a>
          <p style={{ fontSize: "13px", color: "#666", marginTop: "5px" }}>
            Or copy this link:
            <br />
            <button onClick={copyLink} style={styles.verifyLinkButton}>
              {verificationLink}
            </button>
          </p>
        </div>
      )}

      <p style={styles.switchText}>
        Already have an account?{" "}
        <Link to="/institute/login" style={styles.link}>Login here</Link>
      </p>

      <Link to="/" style={styles.backBtn}>Back to Home</Link>
    </div>
  );
}

export default RegisterInstitute;

// ======== Inline Styles ========
const styles = {
  container: {
    maxWidth: "480px",
    margin: "40px auto",
    padding: "32px",
    backgroundColor: "#fff",
    borderRadius: "14px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: "24px",
    color: "#2563eb",
    fontSize: "1.8rem",
    fontWeight: "700",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "1rem",
    outline: "none",
    transition: "0.2s",
  },
  primaryBtn: {
    padding: "12px 16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.2s",
  },
  message: {
    marginTop: "12px",
    fontWeight: "500",
    textAlign: "center",
  },
  verifySection: {
    marginTop: "20px",
    padding: "12px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
  },
  verifyLink: {
    display: "inline-block",
    margin: "8px 0",
    padding: "8px 16px",
    backgroundColor: "#06b6d4",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "500",
  },
  verifyLinkButton: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid #2563eb",
    backgroundColor: "#fff",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "0.85rem",
    marginTop: "5px",
  },
  switchText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "0.9rem",
  },
  link: {
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: "600",
  },
  backBtn: {
    display: "block",
    margin: "24px auto 0",
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#1d4ed8",
    padding: "10px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
  },
};
