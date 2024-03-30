import { useState } from "react";
import "./LoginForm.css";

const LoginForm = ({ onLogin, onToggle }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    onLogin(loginForm);
  };

  const validateForm = () => {
    const fields = Object.keys(loginForm).map((key) => {
      if (!loginForm[key]) return key;
    });

    return fields.length > 0;
  };

  return (
    <div className="card">
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={loginForm.email}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={loginForm.password}
            onChange={handleChange}
            required
          ></input>
        </div>

        <br />
        <center className="login-actions">
          <button onClick={handleClick}> Login </button>
          &nbsp;&nbsp;
          <button className="btn-outline" onClick={onToggle}>
            Sign Up
          </button>
        </center>
      </form>
    </div>
  );
};

export default LoginForm;
