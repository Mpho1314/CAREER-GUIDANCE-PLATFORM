import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../components/styles/Panel.css";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState("");
  const navigate = useNavigate();

  // 🔹 Get the logged-in institute info
  const institute = JSON.parse(localStorage.getItem("user"));
  const instituteId = institute?.uid || institute?.id;

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch(
          `https://careerplatform-z4jj.onrender.com/institute/${instituteId}/courses`
        );
        const data = await res.json();
        if (data.success) setCourses(data.courses);
      } catch (err) {
        console.error(err);
      }
    };

    if (instituteId) fetchCourses();
  }, [instituteId]);

  const addCourse = async () => {
    if (!newCourse) return;
    try {
      const res = await fetch(
        `https://careerplatform-z4jj.onrender.com/institute/${instituteId}/courses`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newCourse }),
        }
      );
      const data = await res.json();
      if (data.success) setCourses((prev) => [...prev, data.course]);
      setNewCourse("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-main">
      <button className="back-btn" onClick={() => navigate("/dashboard/institute")}>
        ← Back to Institute Panel
      </button>
      <h1>Courses</h1>
      <div className="card-grid">
        {courses.map((course) => (
          <div className="card" key={course.id}>
            <h3>{course.name}</h3>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
        <div className="card">
          <input
            type="text"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            placeholder="New Course Name"
          />
          <button onClick={addCourse}>Add Course</button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
