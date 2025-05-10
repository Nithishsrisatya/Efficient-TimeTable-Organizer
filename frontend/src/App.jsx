import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Timetable from './components/Timetable';
import Login from './pages/Login';
import { AllocationProvider } from './contexts/AllocationContext';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => localStorage.getItem('isAuthenticated') === 'true'
  );

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <AllocationProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Dashboard />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/login"
            element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
          />
          <Route path="/timetable" element={<Timetable />} />
        </Routes>
      </Router>
    </AllocationProvider>
  );
};

export default App;

