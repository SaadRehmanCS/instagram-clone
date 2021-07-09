import { useState, useContext } from "react";
import PropTypes from 'prop-types';
import FirebaseContext from "../../context/firebase";
import UserContext from "../../context/user";

export default function Actions({docId, totalLikes, likedPhoto, handleFocus}) {
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
    }

    await firebase.firestore()
    .collection('photos').doc(docId)
    .update({
        liked: toggleLiked ? FieldValue.arrayRemove(userId)
        : FieldValue.arrayUnion(userId)
    });

    
}