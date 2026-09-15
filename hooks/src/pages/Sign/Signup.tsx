/**
 * Signup.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Stan formularza i rejestracja przeniesione do useSignup().
 */
import { useSignup } from "../../hooks/useSignup";

function Signup() {
  const { username, setUsername, email, setEmail, password, setPassword, signupError, handleSubmit } = useSignup();

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
