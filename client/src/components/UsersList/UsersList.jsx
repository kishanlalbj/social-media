import { Link } from "react-router-dom";
import "./UsersList.css";

const UsersList = ({ title, users, btnText, onClick }) => {
  return (
    <>
      <div className="card">
        <h4>{title}</h4>

        <ul className="profile-followers-list">
          {users?.length === 0 && <span>No users here</span>}
          {users?.map((u) => (
            <li key={u._id} className="profile-list-item">
              <Link
                to={`/profile/${u._id}`}
                className="profile-link profile-link-container"
              >
                <img
                  src="https://i.pravatar.cc/300"
                  alt="avatar"
                  className="profile-list-avatar"
                ></img>
                {u.firstName} {u.lastName}
              </Link>

              {btnText && (
                <button className="btn-sm" onClick={() => onClick(u._id)}>
                  {btnText}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default UsersList;
