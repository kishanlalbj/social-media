import { MdPersonAdd } from "react-icons/md";
import { Link } from "react-router-dom";
import dummyAvatar from "../../assets/avatar.svg";
import "./Recommendation.css";

const Recommendation = ({ onFollow, users = [] }) => {
  return (
    <div className="recommendation-card">
      <h4>Recommendation</h4>

      <div className="recommendation-list">
        {users.length === 0 && (
          <p style={{ fontSize: "12px" }}>No Suggesstions as of now</p>
        )}
        {users.length > 0 &&
          users?.map((user) => {
            return (
              <div key={user._id} className="recommendation-list-item">
                <Link to={`/profile/${user._id}`} className="profile-link">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <img
                      src={user.avatar ? user?.avatar : dummyAvatar}
                      width={"100%"}
                      className="post-avatar"
                      alt="profile"
                    ></img>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </div>
                </Link>

                <button className="btn-sm" onClick={() => onFollow(user._id)}>
                  <MdPersonAdd />
                </button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Recommendation;
