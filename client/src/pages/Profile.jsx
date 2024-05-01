import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileById } from "../app/slices/profile";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../components/PostCard/PostCard.jsx";
import { commentPostAsync, likePostAsync } from "../app/slices/profile";
import AuthContext from "../contexts/AuthContext.js";
import Search from "../components/Search/Search.jsx";
import { searchUsersAsync } from "../app/slices/search.js";
import { followUserAsync, unfollowUserAsync } from "../app/slices/auth.js";
import ProfileCover from "../components/ProfileCover/ProfileCover.jsx";
import { MdEmail, MdLocationCity } from "react-icons/md";

const Profile = () => {
  const { profileId } = useParams();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { loading: sloading, results } = useSelector((state) => state.search);
  const currentUser = useContext(AuthContext);

  useEffect(() => {
    //Fetch profile by id
    dispatch(fetchProfileById(profileId));
  }, [dispatch, profileId]);

  const handleLike = (id) => {
    dispatch(likePostAsync(id));
  };

  const handleComment = (id, comment) => {
    dispatch(commentPostAsync({ id, text: comment }));
  };

  const handleSearch = (query) => {
    dispatch(searchUsersAsync(query));
  };

  const handleUnfollow = () => {
    dispatch(unfollowUserAsync(profileId));
  };

  const handleFollow = () => {
    dispatch(followUserAsync(profileId));
  };

  // const alreadyFollowing = currentUser?.following?.includes(profile?.user?._id);
  const alreadyFollowed = !!currentUser?.following?.find(
    (u) => u._id === profile?.user?._id
  );

  const isOwn = currentUser?._id === profile?.user?._id;

  return (
    <div>
      <div className="profile-container">
        <div>
          <Search
            onSearch={handleSearch}
            loading={sloading}
            options={results}
          />
        </div>

        <div>
          <ProfileCover
            firstName={profile?.user?.firstName}
            avatar={profile?.user?.avatar}
            lastName={profile?.user?.lastName}
            email={profile?.user?.email}
            followers={profile?.user?.followers}
            alreadyFollowed={alreadyFollowed}
            onFollow={handleFollow}
            onUnFollow={handleUnfollow}
            isOwn={isOwn}
          ></ProfileCover>
        </div>

        <div className="profile-posts-container">
          <div
            style={{
              height: "245px",
              width: "345px",
            }}
          >
            <div className="card profile-card">
              <p>
                <MdEmail size={"24px"} className="icon-active" />
                <span>{profile?.user.email}</span>
              </p>
              <p>
                <MdLocationCity size={"24px"} className="icon-active" />
                <span>
                  {profile?.user.city}, {profile?.user.country}
                </span>
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column-reverse",
              gap: "24px",
              flexGrow: 1,
            }}
          >
            {profile?.posts?.length === 0 && <h5>No Post found</h5>}
            {profile?.posts?.map((post) => {
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
        </div>
      </div>
    </div>
  );
};

export default Profile;
