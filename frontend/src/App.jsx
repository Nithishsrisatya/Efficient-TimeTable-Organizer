import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Timetable from "./components/Timetable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/timetable" element={<Timetable />} />
      </Routes>
    </Router>
  );
};

export default App;
