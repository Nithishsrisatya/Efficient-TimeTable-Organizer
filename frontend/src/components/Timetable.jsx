import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const Timetable = () => {
  const [timetable, setTimetable] = useState({});

  useEffect(() => {
    const storedTimetable = localStorage.getItem("timetable");
    if (storedTimetable) {
      setTimetable(JSON.parse(storedTimetable));
    }
  }, []);

  const days = Object.keys(timetable);
  const slots = [
    "9:30 - 10:20 AM",
    "10:20 - 11:10 AM",
    "11:10 - 12:00 PM",
    "12:50 - 1:40 PM",
    "1:40 - 2:30 PM",
    "2:30 - 3:20 PM",
  ];

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Weekly Timetable", 14, 20);

    const tableColumn = ["Day/Time", ...slots];
    const tableRows = [];

    days.forEach((day) => {
      const row = [day];
      slots.forEach((slot) => {
        const entry = timetable[day]?.[slot];
        row.push(entry ? `${entry.subject} (${entry.faculty})` : "-");
      });
      tableRows.push(row);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10 },
    });

    doc.save("timetable.pdf");
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center" }}>Weekly Timetable</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "center" }}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Day/Time</th>
            {slots.map((slot) => (
              <th key={slot} style={headerCellStyle}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day}>
              <th style={dayCellStyle}>{day}</th>
              {slots.map((slot) => (
                <td key={slot} style={cellStyle}>
                  {timetable[day]?.[slot]
                    ? `${timetable[day][slot].subject} (${timetable[day][slot].faculty})`
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button onClick={downloadPDF} style={downloadButtonStyle}>
          Download Timetable as PDF
        </button>
      </div>
    </div>
  );
};

const headerCellStyle = {
  backgroundColor: "#f1f3f5",
  color: "#495057",
  padding: "10px",
  fontSize: "14px",
  border: "1px solid #e9ecef",
};

const dayCellStyle = {
  backgroundColor: "#f8f9fa",
  fontWeight: "bold",
  padding: "12px",
  border: "1px solid #e9ecef",
  fontSize: "14px",
  color: "#495057",
};

const cellStyle = {
  padding: "12px",
  border: "1px solid #e9ecef",
  fontSize: "14px",
  color: "#495057",
};

const downloadButtonStyle = {
  marginTop: "15px",
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Timetable;

