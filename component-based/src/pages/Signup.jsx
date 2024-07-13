import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from 'react-auth-kit/hooks/useSignIn';


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        localStorage.setItem("token", data.token);
        if (
          signIn({
            auth: {
              token: data.token,
              type: "Bearer",
            },
          })
        ) {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("An error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      {signupError && <p style={{ color: "red" }}>{signupError}</p>}
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
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <button type="submit">Signup</button>
        <button onClick={() => navigate("/login")}>Login</button>
      </form>
    </div>
  );
}

export default Signup;
