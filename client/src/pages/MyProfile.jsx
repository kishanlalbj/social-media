import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { editUserAsync, unfollowUserAsync } from "../app/slices/auth";
import ProfileEditForm from "../components/ProfileEditForm/ProfileEditForm";
import UsersList from "../components/UsersList/UsersList";
import ProfileCover from "../components/ProfileCover/ProfileCover";

const MyProfile = () => {
  const { currentUser, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [editMode, setEditMode] = useState(false);
  const [file, setFile] = useState(currentUser.avatar);
  const [previewFile, setPreviewFile] = useState(null);
  const [formData, setFormData] = useState({
    ...currentUser,
  });

  const handleSave = (e) => {
    e.preventDefault();

    dispatch(editUserAsync({ ...formData, file })).then((res) => {
      if (res.meta.requestStatus === "fulfilled") setEditMode(false);
    });
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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
  };

  return (
    <div>
      <div className="my-profile-container">
        <ProfileCover
          avatar={currentUser.avatar}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          email={currentUser.email}
          followers={currentUser.followers}
          isOwn={true}
          onEdit={toggleEditMode}
        ></ProfileCover>

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
        <div className="edit-form-container">
          <div className="container">
            <ProfileEditForm
              previewAvatar={previewFile}
              onAvatarChange={handleFileChange}
              onChange={handleChange}
              formData={formData}
              onSave={handleSave}
              error={error}
              onClose={() => setEditMode(false)}
            ></ProfileEditForm>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
