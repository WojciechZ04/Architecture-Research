import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";

interface SignupResponse {
  token: string;
}

function Signup() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [signupError, setSignupError] = useState<string>("");

  const navigate = useNavigate();
  const signIn = useSignIn();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/sign/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        const data: SignupResponse = await response.json();
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
      } else {
        setSignupError("Registration failed. Please check your details.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setSignupError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="sign">
      <div className="sign-container">
        <h2>Signup</h2>
        {signupError && <p style={{ color: "red" }}>{signupError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Username"
              id="Username"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="label">Email</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="label">Password</label>
            <input
              autoComplete="off"
              name="Password"
              id="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
      </div>
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
}

export default Signup;