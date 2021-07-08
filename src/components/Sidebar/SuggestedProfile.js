import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { updateFollowing, updateFollowers } from '../../services/firebase';

export default function SuggestedProfile({otherUserDocId, username, profileId, userId, loggedInUserDocId}) {
    const [followed, setFollowed] = useState(false);
    
    async function handleFollow() {
        setFollowed(true);
        updateFollowers(otherUserDocId, userId, false);
        updateFollowing(loggedInUserDocId, profileId, false);

    }

    return (
        !followed ? (
            <div className="flex flex-row items-center align-items justify-between">
                <div className="flex items-center justify-between">
                    <img 
                        className="rounded-full w-8 flex mr-3"
                        src={`https://instagramavatars.s3.eu-west-2.amazonaws.com/avatars/${username}.jpg`} alt={`image for ${username}`} />
                        <Link to={`/p/${username}`}>
                            <p className="font-bold text-sm">{username}</p>
                        </Link>
                </div>
                <div>
                    <button 
                    className="text-sm font-medium text-blue-button"
                    onClick={handleFollow}
                    >Follow</button>
                </div>
            </div>
        ) : (null)
    );
}

SuggestedProfile.propTypes = {
    otherUserDocId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    profileId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    loggedInUserDocId: PropTypes.string.isRequired
}