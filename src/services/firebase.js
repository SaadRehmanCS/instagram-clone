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