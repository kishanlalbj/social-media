import { useState } from "react";
import "./PostForm.css";
import { MdImage } from "react-icons/md";

const PostForm = ({ onPost }) => {
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
        <form>
          <div>
            <textarea
              placeholder="Your Post here"
              rows={2}
              className="post-textarea"
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {file && (
            <img src={previewImage} alt="preview-img" width={"100%"}></img>
          )}
          <div className="post-form-actions">
            <label htmlFor="post-image">
              {file?.name}
              <MdImage size={"24px"} className="icon icon-active" />
            </label>
            <input
              type="file"
              id="post-image"
              onChange={handleFileChange}
              hidden
            ></input>
            <button type="submit" onClick={handlePost}>
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
