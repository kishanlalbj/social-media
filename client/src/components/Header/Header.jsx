import { MdPersonOutline } from "react-icons/md";
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
                <MdPersonOutline className="icon" size="24px" />
              </Link>
              <button onClick={onLogout}>Sign Out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
