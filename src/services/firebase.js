import { firebase, FieldValue } from "../lib/firebase";

export async function doesUserNameExist(username) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username)
    .get();
    // console.log('result',result);
    // console.log('map', result.docs.map((user) => user.data().length > 0));
    return result.docs.map((user) => user.data().length > 0);
    
}

// get user from the firstore where userId === userId (passed from the auth)
export async function getUserByUserId(userId) {
    const result = await firebase
    .firestore()
    .collection('users')
    .where('userId', '==', userId)
    .get();

    const user = result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }));
    return user;
}

export async function getSuggestedProfiles(userId, following) {
    const result = await firebase.firestore()
    .collection('users').limit(10).get();
    
    const ans = result.docs.map((user) => ({
        ...user.data(), docId: user.id})).filter((profile) => profile.userId !== userId && !following.includes(profile.userId));
        return ans;
}

export async function updateFollowers(otherUserDocId, userId, isFollower) {
    await firebase.firestore().collection('users')
    .doc(otherUserDocId).update({
        followers: isFollower ? FieldValue.arrayRemove(userId) : FieldValue.arrayUnion(userId)
    });
}

export async function updateFollowing(loggedInUserDocId, profileId, isFollowing) {
    await firebase.firestore().collection('users')
    .doc(loggedInUserDocId).update({
        following: isFollowing ? FieldValue.arrayRemove(profileId) : FieldValue.arrayUnion(profileId)
    });
}

export async function getPhotos(userId, following) {
    const result = await firebase.firestore().collection('photos')
    .where('userId', 'in', following)
    .get();

    const userFollowedPhotos = result.docs.map((photo) => ({
        ...photo.data(), docId: photo.id
    }));

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            let userLikedPhoto = false;
            if (photo.likes.includes(userId)) {
                userLikedPhoto = true;
            }
            const user = await getUserByUserId(photo.userId);
            const { username } = user[0];
            return { username, ...photo, userLikedPhoto};
        })
    );

    return photosWithUserDetails;
}