import { MdLogout, MdPersonOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header>
      <div className="container">
        <div className="header-container">
          <h4>
            <Link to="/" className="header-brand">
              Socio
            </Link>
          </h4>

          {isAuthenticated && (
            <div className="header-actions">
              <Link
                to="/profile/me"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MdPersonOutline className="icon" />
              </Link>

              <div>
                <MdLogout className="icon" onClick={onLogout} />
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
