import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProfileById } from "../app/slices/profile";
import { useDispatch, useSelector } from "react-redux";
import ProfileCard from "../components/ProfileCard/ProfileCard.jsx";
import PostCard from "../components/PostCard/PostCard.jsx";
import { commentPostAsync, likePostAsync } from "../app/slices/profile";
import AuthContext from "../contexts/AuthContext.js";
import Search from "../components/Search/Search.jsx";
import { searchUsersAsync } from "../app/slices/search.js";
import { followUserAsync, unfollowUserAsync } from "../app/slices/auth.js";

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

  const handleUnfollow = (id) => {
    dispatch(unfollowUserAsync(id));
  };

  const handleFollow = (id) => {
    dispatch(followUserAsync(id));
  };

  // const alreadyFollowing = currentUser?.following?.includes(profile?.user?._id);
  const alreadyFollowed = !!currentUser?.following?.find(
    (u) => u._id === profile?.user?._id
  );

  return (
    <div>
      <div className="profile-container">
        <div>
          <Search
            onSearch={handleSearch}
            loading={sloading}
            options={results}
          />
          <ProfileCard
            id={profileId}
            firstName={profile?.user?.firstName}
            avatar={profile?.user?.avatar}
            lastName={profile?.user?.lastName}
            following={profile?.user?.following}
            followers={profile?.user?.followers}
            isOwn={currentUser?._id === profile?.user?._id}
            alreadyFollowed={alreadyFollowed}
            city={profile?.user?.city}
            country={profile?.user?.country}
            bio={profile?.user?.bio}
            onUnFollow={handleUnfollow}
            onFollow={handleFollow}
          ></ProfileCard>
        </div>

        <div className="profile-posts-container">
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
  );
};

export default Profile;
