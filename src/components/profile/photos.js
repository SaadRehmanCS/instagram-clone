import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function Photos({photos}) {
    return <p>Photos</p>;
}

Photos.propTypes = {
    photos: PropTypes.array.isRequired
};