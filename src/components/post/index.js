import { useRef } from "react"
import PropTypes from 'prop-types';
import Header from "./Header";
import Image from './Image';
import Actions from "./actions";

export default function Post({ content }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();

    return (
        <div className="rounded col-span-4 bg-white border border-gray-primary mb-16 mt-4 w-11/12">
            <Header username={content.username} />
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions 
                docId={content.docId}
                totalLikes={content.likes.length}
                likedPhoto={content.userLikedPhoto}
                handleFocus={handleFocus}
            />
        </div>
    )
}

Post.propTypes = {
    content: PropTypes.shape({
        username: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired,
        caption: PropTypes.string.isRequired,
        docId: PropTypes.string.isRequired,
        userLikedPhoto: PropTypes.bool.isRequired,
        likes: PropTypes.array.isRequired,
        comments: PropTypes.array.isRequired,
        dateCreated: PropTypes.number.isRequired
    })
}