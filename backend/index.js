const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const timetable = []; // store generated timetable
const allocations = []; // store subject-faculty allocations

app.get('/api/timetable', (req, res) => {
  res.json(timetable);
});

app.get('/api/allocations', (req, res) => {
  res.json(allocations);
});

app.get('/api/timetable/download', (req, res) => {
  // Example: generate and send a PDF
  const PDFDocument = require('pdfkit');
  const doc = new PDFDocument();
  res.setHeader('Content-Disposition', 'attachment; filename="timetable.pdf"');
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);
  doc.fontSize(20).text('Generated Timetable', { align: 'center' });
  timetable.forEach(entry => {
    doc.text(`${entry.day} - Period ${entry.period + 1}: ${entry.subject} (${entry.faculty})`);
  });
  doc.end();
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
