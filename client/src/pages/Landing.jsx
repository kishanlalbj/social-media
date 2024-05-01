import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../components/LoginForm/LoginForm";
import { fetchCurrentUser, loginAsync } from "../app/slices/auth";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import { registerUserAsync } from "../app/slices/registration";

const Landing = () => {
  const { isAuthenticated: isAuth, error: loginError } = useSelector(
    (state) => state.auth
  );
  const { error: registerError } = useSelector((state) => state.register);
  const [showRegistration, setShowRegistration] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (loginData) => {
    dispatch(loginAsync(loginData));
  };

  const handleRegistration = (registrationData) => {
    dispatch(registerUserAsync(registrationData));
  };

  useEffect(() => {
    if (isAuth) {
      dispatch(fetchCurrentUser());
      navigate("/home");
    }
  }, [isAuth, navigate, dispatch]);

  return (
    <>
      {!showRegistration ? (
        <LoginForm
          onLogin={handleLogin}
          onToggle={() => setShowRegistration(true)}
          error={loginError}
        />
      ) : (
        <RegistrationForm
          onToggle={() => setShowRegistration(false)}
          onRegistration={handleRegistration}
          error={registerError}
        />
      )}
    </>
  );
};

export default Landing;
