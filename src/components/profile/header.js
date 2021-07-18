import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Skeleton from "react-loading-skeleton";
import useUser from "../../hooks/use-user";
import { isUserFollowingProfile } from "../../services/firebase";


export default function Header({
    photosCount, followerCount, setFollowerCount, profile: {
        docId: profileDocId, username: profileUserName, userId: profileUserId, fullName, following = [], followers = []
    } }) {

    const { user } = useUser();
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const activeBtnFollow = user.username && user.username !== profileUserName;

    useEffect(() => {
        const isLoggedInUserFollowingProfile = async () => {
            const isFollowing = await isUserFollowingProfile(user.username, profileUserId);
            setIsFollowingProfile(!!isFollowing);
        }

        if (user.username && profileUserId) {
            isLoggedInUserFollowingProfile();
        }
    });

    const handleToggleFollow = () => {
        setIsFollowingProfile((isFollowingProfile) => !isFollowingProfile);
        setFollowerCount({
            followerCount: isFollowingProfile ? followers.length - 1 : followers.length + 1
        });
    };

    return (
        <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
            <div className="container flex justify-center">
                <img
                    className="rounded-full h-40 w-40 flex"
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
                            <Skeleton count={1} width={677}/>
                        )}
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