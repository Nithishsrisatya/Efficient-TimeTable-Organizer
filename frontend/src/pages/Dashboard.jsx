import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [allocations, setAllocations] = useState([]);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");

  const [facultyList] = useState(["Dr. Smith", "Prof. Jane", "Mr. Raj"]);
  const [subjectList] = useState(["Mathematics", "Physics", "Chemistry", "Computer Science"]);
  const [departmentList] = useState(["Computer Science", "Electronics", "Mechanical", "Civil"]);

  const [faculty, setFaculty] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");

  // ✅ Added timetable generation logic
  const generateTimetable = (allocations) => {
    const timetable = {
      Monday: {},
      Tuesday: {},
      Wednesday: {},
      Thursday: {},
      Friday: {},
    };

    const slots = [
      "9:30 - 10:20 AM",
      "10:20 - 11:10 AM",
      "11:10 - 12:00 PM",
      "12:50 - 1:40 PM",
      "1:40 - 2:30 PM",
      "2:30 - 3:20 PM",
    ];

    let slotIndex = 0;
    let allocationIndex = 0;
    const days = Object.keys(timetable);

    for (let day of days) {
      for (let slot of slots) {
        if (allocationIndex < allocations.length) {
          const entry = allocations[allocationIndex];
          timetable[day][slot] = {
            faculty: entry.faculty,
            subject: entry.subject,
          };
          allocationIndex++;
        } else {
          timetable[day][slot] = null;
        }
      }
    }

    return timetable;
  };

  const handleAllocate = () => {
    if (!year || !semester || !section) {
      alert("Please select Year, Semester, and Section.");
      return;
    }

    if (!faculty || !subject || !department) {
      alert("Please select faculty, subject, and department.");
      return;
    }

    const alreadyAllocated = allocations.some(
      (entry) =>
        (entry.faculty === faculty || entry.subject === subject) &&
        entry.year === year &&
        entry.semester === semester &&
        entry.section === section
    );

    if (alreadyAllocated) {
      alert("Either this faculty or subject has already been allocated for the selected section.");
      return;
    }

    setAllocations([
      ...allocations,
      {
        faculty,
        subject,
        department,
        year,
        semester,
        section,
      },
    ]);

    setFaculty("");
    setSubject("");
    setDepartment("");
  };

  const handleGenerate = () => {
    const timetable = generateTimetable(allocations);
    localStorage.setItem("timetable", JSON.stringify(timetable));
    navigate("/timetable");
  };

  const showAllocationArea = year && semester && section;

  const filteredAllocations = allocations.filter(
    (entry) => entry.year === year && entry.semester === semester && entry.section === section
  );

  return (
    <div style={styles.dashboard}>
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

            <div style={styles.section}>
              <label>Select Department</label>
              <select value={department} onChange={(e) => setDepartment(e.target.value)} style={styles.input}>
                <option value="">-- Select --</option>
                {departmentList.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <button onClick={handleAllocate} style={{ ...styles.button, width: "200px" }}>
              Allocate
            </button>
          </div>

          {filteredAllocations.length > 0 && (
            <div>
              <h3>Allocated Subjects</h3>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Faculty Name</th>
                    <th style={styles.th}>Subject</th>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>Year</th>
                    <th style={styles.th}>Semester</th>
                    <th style={styles.th}>Section</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAllocations.map((entry, index) => (
                    <tr key={index}>
                      <td style={styles.td}>{entry.faculty}</td>
                      <td style={styles.td}>{entry.subject}</td>
                      <td style={styles.td}>{entry.department}</td>
                      <td style={styles.td}>{entry.year}</td>
                      <td style={styles.td}>{entry.semester}</td>
                      <td style={styles.td}>{entry.section}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleGenerate} style={styles.button}>
                Generate Timetable
              </button>
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
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  heading: { textAlign: "center", marginBottom: "20px" },
  filters: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "20px",
  },
  allocation: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginBottom: "20px",
  },
  section: { flex: 1 },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "8px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    backgroundColor: "#f2f2f2",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
  },
};

export default Dashboard;

