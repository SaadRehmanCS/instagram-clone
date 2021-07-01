import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

// call seed file only once here

// get all this info from firebase project settings
const config = {
  apiKey: 'AIzaSyAIBFp4AiyviXysW3SDxOES6ln-dCboLfE',
  authDomain: 'instagram-9df97.firebaseapp.com',
  projectId: 'instagram-9df97',
  storageBucket: 'instagram-9df97.appspot.com',
  messagingSenderId: '462169701846',
  appId: '1:462169701846:web:b3a8815468e240e693b877'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);
export { firebase, FieldValue };
