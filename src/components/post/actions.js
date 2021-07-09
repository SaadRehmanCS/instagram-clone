import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function Actions({ docId, totalLikes, likedPhoto, handleFocus }) {
    const {
        user: {
            uid: userId = ''
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
                liked: toggleLiked ? FieldValue.arrayRemove(userId)
                    : FieldValue.arrayUnion(userId)
            });
        
        setLikes((likes) => (toggleLiked ? likes + 1 : likes - 1));
    };

    return (
        <> 
        <div className="flex justify-between p-2">
            <div className="flex">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-8 w-8 ml-2 ${toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'}`} 
            onClick={handleToggleLiked}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            </div>
        </div>
        </>
    )
}

Actions.propTypes = {
    docId: PropTypes.string.isRequired,
    totalLikes: PropTypes.number.isRequired,
    likedPhoto: PropTypes.bool.isRequired,
    handleFocus: PropTypes.func.isRequired
}