import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
		const response = await fetch("http://localhost:5000/api/login", {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ username, password }),
		});
  
		if (response.ok) {
		  const data = await response.json();
		  console.log('Login successful:', data);
		  navigate('/');
		} else {
		  // Handle non-200 responses
		  setLoginError('Invalid username or password');
		}
	  } catch (error) {
		console.error('Login error:', error);
		setLoginError('An error occurred. Please try again later.');
	  }
	};

  return (
    <div>
      <h2>Login</h2>
	  {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;