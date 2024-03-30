import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";

import AuthContext from "../contexts/AuthContext";
import { fetchCurrentUser, logout } from "../app/slices/auth";
import { useEffect } from "react";

const RootLayout = () => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.auth);
  // const [token] = useState(localStorage.getItem("tkn"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (localStorage.getItem("tkn")) {
      dispatch(fetchCurrentUser());
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, dispatch, navigate]);

  // useEffect(() => {
  //   if (token) {
  //     // dispatch(fetchCurrentUser());
  //     navigate("/home");
  //   }
  // }, [dispatch, token, navigate, isAuthenticated]);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <AuthContext.Provider value={{ ...currentUser }}>
        <div className="container">
          <section>
            <Outlet />
          </section>
        </div>
      </AuthContext.Provider>
    </>
  );
};

export default RootLayout;
