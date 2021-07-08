import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { memo } from 'react';

const User = ({username, fullName}) => {
    // console.log('username', username);
    // console.log('fullname', fullName);
    return (!username || !fullName) ? (
        <Skeleton count={1} height={61} />
    ) : (
        <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
            <div className="flex items-center justify-between col-span-1">
            <img 
            className="rounded-full w-16 flex mx-3" 
            alt=""
            src={`https://instagramavatars.s3.eu-west-2.amazonaws.com/avatars/${username}.jpg`}
            />
            </div>
            <div className="col-span-3">
            <p className="font-bold text-sm">{username}</p>
            <p className="text-sm">{fullName}</p>
            </div>
        </Link>
    );
}

export default memo(User);

User.propTypes = {
    username: PropTypes.string,
    fullName: PropTypes.string
}

User.whyDidYouRender = true;