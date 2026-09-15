/**
 * Login.tsx (wariant: hooks)
 * -----------------------------------------------------------------------
 * Stan formularza i logowanie przeniesione do useLogin().
 */
import "./Sign.css";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  const { username, setUsername, password, setPassword, loginError, handleSubmit } = useLogin();

  return (
    <div className="sign">
      <div className="sign-container">
        <h2>Login</h2>
        {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label">Username</label>
            <input
              autoComplete="off"
              name="Email"
              id="Email"
              className="input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
          <button type="submit">Login</button>
        </form>
      </div>
      <p>
        Don't have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
}

export default Login;
