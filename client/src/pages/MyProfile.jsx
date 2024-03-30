import { useState } from "react";
import { MdDelete, MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editUserAsync, unfollowUserAsync } from "../app/slices/auth";
import ProfileEditForm from "../components/ProfileEditForm/ProfileEditForm";
import UsersList from "../components/UsersList/UsersList";

const MyProfile = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(currentUser.avatar);
  const [previewFile, setPreviewFile] = useState(null);
  const [formData, setFormData] = useState({
    ...currentUser,
  });

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(editUserAsync({ ...formData, avatar: file ? file : null }));

    setEditMode(false);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    setPreviewFile(URL.createObjectURL(e.target.files[0]));
  };

  const handleUserClick = (id) => {
    dispatch(unfollowUserAsync(id));
  };

  return (
    <div>
      <div className="my-profile-container">
        <div className="card">
          <div className="my-profile-section">
            <img
              src={import.meta.env.VITE_IMAGES_SERVER_URL + currentUser?.avatar}
              alt="avatar"
              className="my-profile-avatar"
            />

            <div className="my-profile-details-container">
              <div>
                <div>
                  <p className="my-profile-name">
                    {currentUser.firstName} {currentUser.lastName}
                    &nbsp; &nbsp;
                    <span>
                      <MdEdit
                        className="icon icon-active"
                        size="18px"
                        onClick={() => setEditMode(true)}
                      />
                    </span>
                  </p>
                </div>
              </div>
              <p className="my-profile-bio">{currentUser.bio}</p>
              <p className="my-profile-location">
                {currentUser.city}, {currentUser.country}
              </p>
            </div>
          </div>
        </div>

        <div className="profile-other-sections">
          <UsersList
            users={currentUser?.followers}
            title="Followers"
          ></UsersList>

          <UsersList
            users={currentUser?.following}
            title="Following"
            // btnText={"Unfollow"}
            btnText={<MdDelete />}
            onClick={handleUserClick}
          ></UsersList>
        </div>
      </div>

      {editMode && (
        <div
          className="edit-form-container"
          onClick={() => setEditMode((prev) => !prev)}
        >
          <div className="container">
            <ProfileEditForm
              previewAvatar={previewFile}
              onAvatarChange={handleFileChange}
              onChange={handleChange}
              formData={formData}
              onSave={handleSave}
            ></ProfileEditForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
