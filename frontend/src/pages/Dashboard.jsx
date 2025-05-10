import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [branch, setBranch] = useState("");
  const [facultyList] = useState(["Dr. Smith", "Prof. Jane", "Mr. Raj"]);
  const [subjectList] = useState(["Mathematics", "Physics", "Chemistry", "Computer Science"]);
  const [faculty, setFaculty] = useState("");
  const [subject, setSubject] = useState("");
  const [allocations, setAllocations] = useState([]);

  const handleAllocate = () => {
    if (!faculty || !subject) {
      alert("Please select both faculty and subject.");
      return;
    }
    const alreadyAllocated = allocations.some(
      (entry) => entry.faculty === faculty || entry.subject === subject
    );
    if (alreadyAllocated) {
      alert("Either this faculty or subject has already been allocated.");
      return;
    }
    setAllocations([...allocations, { faculty, subject }]);
  };

  const handleGenerate = () => {
    console.log("Generate Timetable button clicked");
    navigate("/timetable");
  };

  const showAllocationArea = year && semester && section && branch;

  return (
    <div className="dashboard" style={styles.dashboard}>
      <h2 style={styles.heading}>Faculty-Subject Allocation</h2>

      <div style={styles.filters}>
        <div style={styles.section}>
          <label>Academic Year</label>
          <select value={year} onChange={(e) => setYear(e.target.value)} style={styles.input}>
            <option value="">Select Year</option>
            <option>2023-2024</option>
            <option>2024-2025</option>
          </select>
        </div>
        <div style={styles.section}>
          <label>Semester</label>
          <select value={semester} onChange={(e) => setSemester(e.target.value)} style={styles.input}>
            <option value="">Select Semester</option>
            <option>Semester 1</option>
            <option>Semester 2</option>
          </select>
        </div>
        <div style={styles.section}>
          <label>Branch</label>
          <select value={branch} onChange={(e) => setBranch(e.target.value)} style={styles.input}>
            <option value="">Select Branch</option>
            <option>Computer Science</option>
            <option>Electronics</option>
            <option>Mechanical</option>
            <option>Civil</option>
            <option>Information Technology</option>
          </select>
        </div>
        <div style={styles.section}>
          <label>Section</label>
          <select value={section} onChange={(e) => setSection(e.target.value)} style={styles.input}>
            <option value="">Select Section</option>
            <option>A</option>
            <option>B</option>
            <option>C</option>
          </select>
        </div>
      </div>

      {showAllocationArea && (
        <>
          <div style={styles.allocation}>
            <div style={styles.section}>
              <label>Select Faculty</label>
              <select value={faculty} onChange={(e) => setFaculty(e.target.value)} style={styles.input}>
                <option value="">-- Select --</option>
                {facultyList.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>

            <div style={styles.section}>
              <label>Select Subject</label>
              <select value={subject} onChange={(e) => setSubject(e.target.value)} style={styles.input}>
                <option value="">-- Select --</option>
                {subjectList.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={styles.centerButton}>
            <button onClick={handleAllocate} style={styles.button}>Allocate</button>
          </div>

          {allocations.length > 0 && (
            <div>
              <h3>Allocated Subjects</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th>Faculty Name</th>
                    <th>Subject</th>
                  </tr>
                </thead>
                <tbody>
                  {allocations.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.faculty}</td>
                      <td>{entry.subject}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button onClick={handleGenerate} style={styles.button}>Generate Timetable</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  dashboard: {
    maxWidth: "900px",
    margin: "auto",
    background: "white",
    padding: "20px 30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)"
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  filters: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "20px"
  },
  allocation: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "20px"
  },
  section: { flex: 1 },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px"
  },
  centerButton: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px"
  },
  button: {
    padding: "10px 30px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px"
  }
};

export default Dashboard;
