import { useContext, useEffect } from "react";
import PostCard from "../components/PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import {
  commnetPostAsync,
  createPostAsync,
  fetchPostsAsync,
  likePostAsync,
} from "../app/slices/posts";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import AuthContext from "../contexts/AuthContext";
import PostForm from "../components/PostForm/PostForm";
import Search from "../components/Search/Search";
import { searchUsersAsync } from "../app/slices/search";

const Home = () => {
  const dispatch = useDispatch();
  const { posts, error } = useSelector((state) => state.posts);
  const { loading: sloading, results } = useSelector((state) => state.search);

  const currentUser = useContext(AuthContext);

  useEffect(() => {
    dispatch(fetchPostsAsync());
  }, [dispatch]);

  const handlePost = (newPost) => {
    dispatch(createPostAsync(newPost));
  };

  const handleLike = (id) => {
    dispatch(likePostAsync(id));
  };

  const handleComment = (id, comment) => {
    dispatch(commnetPostAsync({ id, text: comment }));
  };

  const handleSearch = (query) => {
    dispatch(searchUsersAsync(query));
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
          <PostForm onPost={handlePost} />

          {posts.length === 0 && <h5>No Posts Found</h5>}

          {posts.map((post) => {
            const liked = post.likes.find((like) => {
              return like._id === currentUser._id;
            });

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
                onLike={handleLike}
                onComment={handleComment}
              ></PostCard>
            );
          })}
        </div>

        {/* <div className="recommendataions">
          <div className="card">Lorem</div>
        </div> */}
      </div>

      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Home;
