import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";
import { memo } from "react";

function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
    const {
        user: {
            uid: userId
        }
    } = useContext(UserContext);

    const [likes, setLikes] = useState(totalLikes);
    const [toggleLiked, setToggleLiked] = useState(likedPhoto);
    const { firebase, FieldValue } = useContext(FirebaseContext);

    const handleToggleLiked = async () => {
        setToggleLiked(!toggleLiked);


        await firebase.firestore()
            .collection('photos').doc(docId)
            .update({
                likes: toggleLiked ? FieldValue.arrayRemove(userId)
                    : FieldValue.arrayUnion(userId)
            });

        setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
    };

    return (
        <>
            <div className="flex justify-between p-2">
                <div className="flex">
                    <svg
                        className={`h-8 w-8 ml-2 ${toggleLiked ? 'fill-red  text-red-primary' : 'text-black-light'}`}
                        onClick={handleToggleLiked}
                        xmlns="http://www.w3.org/2000/svg"  
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>


                    <svg
                        aria-label="Comment"
                        className="items-center ml-3 h-8 w-6"
                        fill="#262626"
                        viewBox="0 0 48 48" >
                        <path
                            d="M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z"
                        >

                        </path>
                    </svg>
                </div>
            </div>
            <div className="px-4">
                <p className="font-bold">
                {likes === 1 ? `${likes} like` : `${likes} likes`}
                </p>
            </div>
        </>
    )
}

export default memo(Actions);

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}