import Error from "../UI/Error/Error";
import dummyAvatar from "../../assets/avatar.svg";

const ProfileEditForm = ({
  previewAvatar,
  formData,
  onChange,
  onSave,
  onAvatarChange,
  onClose,
  error,
}) => {
  return (
    <>
      <div className="card edit-form">
        <form onClick={(e) => e.stopPropagation()}>
          <div>
            <center>
              <label htmlFor="avatar">
                {!formData.avatar && !previewAvatar ? (
                  <img
                    src={dummyAvatar}
                    alt="avatar"
                    className="my-profile-avatar"
                  ></img>
                ) : (
                  <img
                    src={previewAvatar ? previewAvatar : formData?.avatar}
                    alt="avatar"
                    className="my-profile-avatar"
                    style={{ cursor: "pointer" }}
                  ></img>
                )}
              </label>
              <input
                type="file"
                id="avatar"
                onChange={onAvatarChange}
                hidden
              ></input>
            </center>
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={onChange}
              placeholder="First Name"
              id="firstName"
              name="firstName"
            ></input>
          </div>

          <div>
            <label htmlFor="firstName">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={onChange}
              placeholder="Last Name"
              id="lastName"
              name="lastName"
            ></input>
          </div>

          <div>
            <label htmlFor="bio">Bio</label>
            <input
              type="text"
              value={formData.bio}
              onChange={onChange}
              placeholder="bio"
              id="bio"
              name="bio"
            ></input>
          </div>

          <div>
            <label htmlFor="City">City</label>
            <input
              type="text"
              value={formData.city}
              onChange={onChange}
              placeholder="city"
              id="city"
              name="city"
            ></input>
          </div>

          <div>
            <label htmlFor="Country">Country</label>
            <input
              type="text"
              value={formData.country}
              onChange={onChange}
              placeholder="country"
              id="country"
              name="country"
            ></input>
          </div>
          <br />

          <center>
            <button onClick={onSave}>Save</button>
            &nbsp; &nbsp; &nbsp;
            <button className="btn-outline" onClick={onClose}>
              Close
            </button>
          </center>

          <Error error={error} />
        </form>
      </div>
    </>
  );
};

export default ProfileEditForm;
