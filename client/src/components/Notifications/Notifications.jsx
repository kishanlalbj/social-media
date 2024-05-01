import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Notifications.css";

const Notifications = () => {
  const notifications = useSelector((state) => state.notifications.results);

  return (
    <div>
      <div className="card">
        <h4>Notifications</h4>
        <ul className="notifications-list">
          {notifications?.map((n) => (
            <li key={n._id} className="notifications-list-item">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <img
                  src={n?.from.avatar}
                  width={"100%"}
                  style={{ borderRadius: "50%", width: "32px" }}
                  alt="avatar"
                ></img>

                <span>
                  <Link
                    to={`/profile/${n?.from._id}`}
                    className="profile-link"
                    style={{ color: "var(--primary-color)" }}
                  >
                    {n?.from?.firstName} {n?.from.lastName}
                  </Link>
                  &nbsp;
                  {n?.type === "like" ? "liked a" : "commented on a"}
                  &nbsp;
                  <Link
                    to={`/post/${n.post}`}
                    className="profile-link"
                    style={{ color: "var(--primary-color)" }}
                  >
                    post
                  </Link>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
