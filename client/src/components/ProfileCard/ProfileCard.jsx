import { Link } from "react-router-dom";
import "./ProfileCard.css";
import { MdEmail, MdLocationCity } from "react-icons/md";
import dummyAvatar from "../../assets/avatar.svg";

const ProfileCard = ({
  id,
  firstName,
  avatar,
  lastName,
  followers,
  following,
  isOwn,
  email,
  city,
  country,
  bio,
  alreadyFollowed,
  onUnFollow,
  onFollow,
}) => {
  return (
    <div className="card profile-card-wrapper">
      <div className="profile-avatar-section">
        <img
          src={avatar ? avatar : dummyAvatar}
          alt="avatar"
          style={{ objectFit: "contain" }}
          className="profile-avatar"
        />

        <>
          <Link className="profile-link" to={`/profile/${id}`}>
            {firstName} {lastName}
          </Link>

          <p className="profile-bio-text">{bio}</p>
          {!isOwn && !alreadyFollowed ? (
            <button className="btn-sm" onClick={() => onFollow(id)}>
              Follow
            </button>
          ) : (
            <></>
          )}

          {!isOwn && alreadyFollowed && (
            <button className="btn-sm" onClick={() => onUnFollow(id)}>
              {" "}
              Unfollow{" "}
            </button>
          )}
        </>
      </div>

      <div className="profile-details-container">
        <div>
          <p className="profile-title-text">Followers &nbsp;</p>
          <p className="profile-content-text">{followers?.length}</p>
        </div>

        <div>
          <p className="profile-title-text">Following &nbsp;</p>
          <p className="profile-content-text">{following?.length}</p>
        </div>
      </div>
      <br />
      <div className="profile-others">
        <div className="profile-bio-text-container">
          <MdLocationCity className="icon-active" size={"24px"} />
          <span className="profile-bio-text">
            {city}, {country}
          </span>
        </div>

        <div className="profile-bio-text-container">
          <MdEmail className="icon-active" size={"24px"} />
          <span className="profile-bio-text">{email}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
