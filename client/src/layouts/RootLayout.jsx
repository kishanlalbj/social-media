import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header/Header";

import AuthContext from "../contexts/AuthContext";
import { fetchCurrentUser, logout } from "../app/slices/auth";
import { useEffect } from "react";
// import Messanger from "../components/Messenger/Messanger";
import { fetchNotificationsAsync } from "../app/slices/notifications";

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
      dispatch(fetchCurrentUser()).unwrap();
      dispatch(fetchNotificationsAsync());
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [isAuthenticated, dispatch, navigate]);

  return (
    <>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <section>
        <AuthContext.Provider value={{ ...currentUser }}>
          <section className="container">
            <Outlet />
          </section>
        </AuthContext.Provider>
      </section>
    </>
  );
};

export default RootLayout;
