import { useContext, useEffect } from "react";
import PostCard from "../components/PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  commnetPostAsync,
  createPostAsync,
  deletePostAsync,
  fetchPostsAsync,
  likePostAsync,
} from "../app/slices/posts";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import AuthContext from "../contexts/AuthContext";
import PostForm from "../components/PostForm/PostForm";
import Search from "../components/Search/Search";
import { searchUsersAsync } from "../app/slices/search";
import Recommendation from "../components/Recommendation/Recommendation";
import { followUserAsync } from "../app/slices/auth";
import { fetchRecommendationAsync } from "../app/slices/recommendations";
import { socket } from "../socket";
import Notifications from "../components/Notifications/Notifications";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, error } = useSelector((state) => state.posts);
  const { loading: sloading, results } = useSelector((state) => state.search);
  const {
    results: recommendations,
    error: rerror,
    loading: rloading,
  } = useSelector((state) => state.recommendations);

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchPostsAsync());
    dispatch(fetchRecommendationAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchRecommendationAsync());
  }, [currentUser?.following?.length, dispatch]);

  const handlePost = (newPost) => {
    dispatch(createPostAsync(newPost));
  };

  const handleLike = (id, authorId) => {
    dispatch(likePostAsync(id)).unwrap();
    socket.emit("likedPost", {
      from: currentUser?._id,
      to: authorId,
      message: `${currentUser?._id} liked this post ${id}`,
    });
  };

  const handleComment = (id, comment) => {
    dispatch(commnetPostAsync({ id, text: comment }));
  };

  const handleSearch = (query) => {
    dispatch(searchUsersAsync(query));
  };

  const handleFollow = (id) => {
    dispatch(followUserAsync(id));
  };

  const handleDelete = (id) => {
    dispatch(deletePostAsync(id));
  };

  return (
    <div>
      <div className="home-container">
        <div className="profile-section">
          <Search
            onSearch={handleSearch}
            loading={sloading}
            options={results}
          ></Search>

          <ProfileCard
            id={currentUser?._id}
            avatar={currentUser?.avatar}
            firstName={currentUser?.firstName}
            lastName={currentUser?.lastName}
            email={currentUser?.email}
            followers={currentUser?.followers}
            following={currentUser?.following}
            isOwn={true}
            isAlreadyFollowed={true}
            city={currentUser?.city}
            country={currentUser?.country}
            bio={currentUser?.bio}
          ></ProfileCard>
        </div>
        <div className="posts-container">
          <Search
            className="mob-search"
            onSearch={handleSearch}
            loading={sloading}
            options={results}
          ></Search>
          <PostForm avatar={currentUser?.avatar} onPost={handlePost} />

          {posts.length === 0 && <h5>No Posts Found</h5>}

          {posts.map((post) => {
            const liked = post.likes.find((like) => {
              return like._id === currentUser?._id;
            });

            const isOwn = currentUser?._id === post.postedBy._id;

            return (
              <PostCard
                key={post._id}
                id={post._id}
                image={post.image}
                title={post.title}
                author={post.postedBy}
                comments={post.comments}
                createdAt={post.createdAt}
                likes={post.likes}
                liked={liked}
                onLike={(id) => handleLike(id, post.postedBy._id)}
                onComment={handleComment}
                onDelete={handleDelete}
                isOwn={isOwn}
              ></PostCard>
            );
          })}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <Notifications />
          <br />
          <Recommendation
            onFollow={handleFollow}
            loading={rloading}
            error={rerror}
            users={recommendations}
          />
        </div>
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Home;
