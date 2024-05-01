import {
  MdThumbUp,
  MdOutlineThumbUp,
  MdOutlineComment,
  MdSend,
  MdDelete,
} from "react-icons/md";
import moment from "moment";
import "./PostCard.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import dummyAvatar from "../../assets/avatar.svg";

const PostCard = ({
  id,
  title,
  image,
  author,
  createdAt,
  likes,
  liked,
  comments,
  onLike,
  onComment,
  onDelete,
  isOwn,
}) => {
  const [comment, setComment] = useState("");
  const [showComment, setShowComment] = useState(false);

  const handleCommentToggle = () => {
    setShowComment((prev) => !prev);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommitSubmit = (e) => {
    e.preventDefault();
    onComment(id, comment);
    setComment("");
  };

  return (
    <div className="card">
      <div className="post-avatar-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div>
            <img
              src={author.avatar ? author?.avatar : dummyAvatar}
              className="post-avatar"
            ></img>
          </div>
          <div>
            <Link to={`/profile/${author._id}`} className="profile-link">
              {author?.firstName} {author?.lastName}
            </Link>
            <p className="date-text">{moment(createdAt).format("ll")}</p>
          </div>
        </div>

        <div>
          {isOwn && (
            <MdDelete style={{ color: "red" }} onClick={() => onDelete(id)} />
          )}
        </div>
      </div>

      <p>{title}</p>
      <br />

      <div className="post-image-container">
        {image && <img src={image} alt={image} width={"100%"}></img>}
      </div>

      <br />

      <div className="post-actions">
        <div className="post-reaction-section">
          <span>{likes.length > 0 && likes.length}</span>
          {liked ? (
            <MdThumbUp
              className="icon icon-active"
              onClick={() => onLike(id)}
            ></MdThumbUp>
          ) : (
            <MdOutlineThumbUp
              onClick={() => onLike(id)}
              className="icon"
              size={"18px"}
            />
          )}
        </div>

        <div className="post-reaction-section">
          <span>{comments.length > 0 && comments.length}</span>
          <MdOutlineComment
            className={`icon ${comments.length > 0 ? "icon-active" : ""}`}
            size={"18px"}
            onClick={handleCommentToggle}
          />
        </div>
      </div>

      {showComment && (
        <div className="post-comments-container">
          <div className="comment-input-container">
            <textarea
              value={comment}
              onChange={handleCommentChange}
              rows={1}
              className="comment-input"
              placeholder="Your comment here"
            ></textarea>

            <MdSend
              className="icon icon-active"
              size={"24px"}
              onClick={handleCommitSubmit}
            />
          </div>

          <div className="comments-container">
            {comments.map((com) => (
              <div
                key={com._id}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <div>
                  <img
                    src={
                      com.user?.avatar
                        ? com?.user?.avatar
                        : "https://i.pravatar.cc/300"
                    }
                    alt="avatar"
                    style={{ width: "24px", borderRadius: "100%" }}
                  ></img>
                </div>
                <div>
                  <h6>
                    {com.user?.firstName} {com.user?.lastName}
                  </h6>
                  <p>{com.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
