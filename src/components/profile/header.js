import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile, toggleFollow } from "../../services/firebase";


export default function Header({
    photosCount, followerCount, setFollowerCount, profile: {
        docId: profileDocId, username: profileUserName, userId: profileUserId, fullName, following = [], followers = []
    } }) {

    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUserName;

    const handleToggleFollow = async () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
          followerCount: isFollowingProfile ? followerCount - 1 : followerCount + 1
        });
        await toggleFollow(isFollowingProfile, user.docId, profileDocId, profileUserId, user.userId);
      };
    
    useEffect(() => {
        const isLoggedInUserFollowingProfile =  async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        };

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    }, [user?.username, profileUserId]);

    return (
        <div className="grid grid-cols-3 gap-4 align-middle justify-center mx-56 w-full">
            <div className="container flex justify-center">
                <img
                    className="rounded-full h-40 w-40 flex mt-8"
                    alt={`${profileUserName} profile picture`}
                    src={profileUserName !== undefined ? `https://instagramavatars.s3.eu-west-2.amazonaws.com/avatars/${profileUserName}.jpg` : null}
                />
            </div>
            <div className="flex items-center justify-center flex-col col-span-2">
                <div className="container flex items-center">
                    <p className="font-light text-2xl">{profileUserName}</p>
                    {activeBtnFollow && (
                        <button
                            className="bg-blue-button font-bold text-sm rounded text-white w-20 h-8 ml-7"
                            type="button"
                            onClick={handleToggleFollow}
                        >{isFollowingProfile ? 'Unfollow' : 'Follow'}
                        </button>
                    )}
                </div>
                <div className="container flex mt-4">
                        {followers === undefined || following === undefined ? (
                            <Skeleton count={1} width={677} height={24} />
                        ) : (
                            <>
                                <p className="mr-10">
                                    <span className="font-bold">{photosCount}</span>{` `}posts
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{followers.length}</span>{` `}followers
                                </p>
                                <p className="mr-10">
                                    <span className="font-bold">{following.length}</span>{` `}following
                                </p>
                            </>
                        )}
                </div>
                <div className="container mt-4">
                            <p className="font-medium">
                                {!fullName ? <Skeleton width={100} /> : fullName}
                            </p>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
    photosCount: PropTypes.number.isRequired,
    followerCount: PropTypes.number.isRequired,
    setFollowerCount: PropTypes.func.isRequired,
    profile: PropTypes.shape({
        docId: PropTypes.string,
        userId: PropTypes.string,
        fullName: PropTypes.string,
        following: PropTypes.array,
        username: PropTypes.string
    }).isRequired
}