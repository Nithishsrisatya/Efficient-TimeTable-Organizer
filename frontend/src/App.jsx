import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Timetable from './components/Timetable';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <RefreshHandler />
    </Router>
  );
};

// Handles routes and refresh prompt
const RefreshHandler = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [showRefreshPrompt, setShowRefreshPrompt] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === 'F5') || (e.ctrlKey && e.key === 'r')) {
        e.preventDefault();
        if (isAuthenticated) setShowRefreshPrompt(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthenticated]);

  const handleConfirmRefresh = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    setShowRefreshPrompt(false);
    navigate('/login', { replace: true });
  };

  const handleCancelRefresh = () => {
    setShowRefreshPrompt(false);
  };

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    if (!auth) return <Navigate to="/login" state={{ from: location }} replace />;
    return children;
  };

  return (
    <>
      {showRefreshPrompt && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <p>Are you sure you want to refresh? You will be logged out.</p>
            <button style={buttonStyle} onClick={handleConfirmRefresh}>Continue</button>
            <button style={buttonStyle} onClick={handleCancelRefresh}>Cancel</button>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/timetable"
          element={
            <ProtectedRoute>
              <Timetable />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Login onLoginSuccess={() => {
              setIsAuthenticated(true);
              localStorage.setItem('isAuthenticated', 'true');
            }} />
          }
        />
        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />}
        />
      </Routes>
    </>
  );
};

// Styles
const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
};

const modalStyle = {
  backgroundColor: '#fff',
  padding: '20px 30px',
  borderRadius: '12px',
  textAlign: 'center',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
};

const buttonStyle = {
  margin: '10px',
  padding: '10px 16px',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '14px',
};

export default App;
