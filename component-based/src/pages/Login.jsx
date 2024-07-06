import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignIn from 'react-auth-kit/hooks/useSignIn';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const signIn = useSignIn();
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
      localStorage.setItem('token', data.token);
      if (signIn({
        auth: {
          token: data.token,
          type: 'Bearer'
        }
      })) {
        navigate('/');
      }
		} else {
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