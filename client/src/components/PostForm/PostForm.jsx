import { useState } from "react";
import { MdImage } from "react-icons/md";
import dummyAvatar from "../../assets/avatar.svg";
import "./PostForm.css";

const PostForm = ({ avatar, onPost }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handlePost = (e) => {
    e.preventDefault();
    if (!title) return;

    onPost({ title, file });

    setTitle("");
    setFile(null);
    setPreviewImage(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);

    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div className="post-form-container">
      <div className="card">
        <div className="post-form-wrapper">
          <div>
            <img
              src={avatar ? avatar : dummyAvatar}
              alt={"avatar"}
              width={"48px"}
              height={"48px"}
            ></img>
          </div>
          <form>
            <div style={{ borderBottom: "1px solid lightgray" }}>
              <textarea
                placeholder="Your Post here"
                rows={3}
                className="post-textarea"
                onChange={handleChange}
                required
              ></textarea>
            </div>
            {file && (
              <img src={previewImage} alt="preview-img" width={"100%"}></img>
            )}
            <div className="post-form-actions">
              <label
                htmlFor="post-image"
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  color: "var(--primary-color)",
                  fontWeight: "600",
                }}
              >
                {/* {file?.name} */}
                <MdImage size={"24px"} className="icon icon-active" />
                Image
                <input
                  type="file"
                  id="post-image"
                  onChange={handleFileChange}
                  hidden
                ></input>
              </label>
              <button type="submit" onClick={handlePost}>
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
