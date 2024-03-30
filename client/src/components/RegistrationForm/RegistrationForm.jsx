import { useEffect, useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = ({ onRegistration, onToggle }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  useEffect(() => {
    if (passwordTouched && formData.password !== formData.confirmPassword) {
      setPasswordError("Password doesn't match");
    } else {
      setPasswordError("");
    }
  }, [formData.password, formData.confirmPassword, passwordTouched]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log({ formData });
    onRegistration(formData);
  };

  return (
    <div className="card">
      <form>
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          ></input>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
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
            value={formData.password}
            onChange={handleChange}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password"
            onFocus={() => setPasswordTouched(true)}
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          ></input>
          <p className="password-error">{passwordError && passwordError}</p>
        </div>

        <br />
        <center>
          <button type="submit" onClick={handleSignUp}>
            Sign Up
          </button>
          &nbsp;&nbsp;
          <button className="btn-outline" onClick={onToggle}>
            Login
          </button>
        </center>
      </form>
    </div>
  );
};

export default RegistrationForm;
