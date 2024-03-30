import { Link } from "react-router-dom";
import "./ProfileCard.css";
import { MdEmail, MdLocationCity } from "react-icons/md";

const ProfileCard = ({
  id,
  firstName,
  avatar,
  lastName,
  followers,
  following,
  isOwn,
  city,
  country,
  bio,
  alreadyFollowed,
  onUnFollow,
  onFollow,
}) => {
  console.log("---", { avatar }, import.meta.env.VITE_IMAGES_SERVER_URL);
  return (
    <div className="card profile-card-wrapper">
      <div className="profile-avatar-section">
        <img
          src={import.meta.env.VITE_IMAGES_SERVER_URL + avatar}
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
          <MdLocationCity className="icon-active" size={"18px"} />
          <span className="profile-bio-text">
            {city}, {country}
          </span>
        </div>

        <div className="profile-bio-text-container">
          <MdEmail className="icon-active" size={"18px"} />
          <span className="profile-bio-text">{country}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
