import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyA-M5JS6wUN_z11iDelVNIyE5d_v0at-Pw",
  authDomain: "e-shop-crownreactjs.firebaseapp.com",
  databaseURL: "https://e-shop-crownreactjs.firebaseio.com",
  projectId: "e-shop-crownreactjs",
  storageBucket: "e-shop-crownreactjs.appspot.com",
  messagingSenderId: "277318071113",
  appId: "1:277318071113:web:e4234ca1e263e0e998a098",
  measurementId: "G-TQBHZ57HSH"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
