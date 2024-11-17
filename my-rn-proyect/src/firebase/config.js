import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyDhMOQXriMVN3_isqnePvrpreLK_KHJNmk",
  authDomain: "rn-ti-simoabrijuli.firebaseapp.com",
  projectId: "rn-ti-simoabrijuli",
  storageBucket: "rn-ti-simoabrijuli.firebasestorage.app",
  messagingSenderId: "898265358470",
  appId: "1:898265358470:web:b2497b850cf0cad546b107",
  measurementId: "G-67JFSM0C4H"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
