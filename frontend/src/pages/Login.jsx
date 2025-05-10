import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const USERS = ['user1', 'user2'];
const PASSWORD = '1234';

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (USERS.includes(username) && password === PASSWORD) {
      onLoginSuccess(); // Inform App component
      navigate('/');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <form onSubmit={handleLogin} style={styles.form}>
          <h2 style={styles.title}>Faculty Login</h2>
          {error && <p style={styles.error}>{error}</p>}
          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={styles.button}>Login</button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '40px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.5)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px'
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '20px',
    fontSize: '24px'
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px'
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '16px'
  },
  error: {
    color: 'red',
    marginBottom: '10px',
    textAlign: 'center'
  }
};

export default Login;
