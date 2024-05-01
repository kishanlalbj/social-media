import { MdEdit } from "react-icons/md";
import dummyAvatar from "../../assets/avatar.svg";

const ProfileCover = ({
  avatar,
  firstName,
  lastName,
  email,
  alreadyFollowed,
  isOwn,
  onUnFollow,
  onFollow,
  onEdit,
}) => {
  return (
    <div
      style={{
        position: "relative",
        background:
          "url(https://source.unsplash.com/random/?city,night), no-repeat",
        filter: "grayscale",
        backgroundSize: "cover",
        width: "100%",
        height: "245px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.4)",
        }}
        className="overlay"
      ></div>
      <div
        style={{
          position: "absolute",
          left: "0",
          padding: "0 24px",
          bottom: "8%",
          display: "flex",
          alignItems: "center",
          gap: "18px",
          color: "#fff",
          width: "100%",
        }}
      >
        <img
          src={avatar ? avatar : dummyAvatar}
          alt="avatar"
          style={{ border: "5px solid #fff" }}
          className="my-profile-avatar"
        />

        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: "6px",
          }}
        >
          <h3>
            {firstName} {lastName}
          </h3>
          <p style={{ fontSize: "14px" }}>{email}</p>

          {!isOwn ? (
            alreadyFollowed ? (
              <button className="btn-sm" onClick={onUnFollow}>
                Unfollow
              </button>
            ) : (
              <button className="btn-sm" onClick={onFollow}>
                Follow
              </button>
            )
          ) : (
            <>
              <button className="btn-sm" onClick={onEdit}>
                <MdEdit></MdEdit>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCover;
