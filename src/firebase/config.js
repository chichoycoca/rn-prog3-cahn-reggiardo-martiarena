import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBF-EWTLtmmIV6jl8OCHMu8kVcZEELS1O8",
    authDomain: "rn-integrador-crm.firebaseapp.com",
    projectId: "rn-integrador-crm",
    storageBucket: "rn-integrador-crm.firebasestorage.app",
    messagingSenderId: "758787570726",
    appId: "1:758787570726:web:f8c3600ce1de6a4d663ae7"
  };
  

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();
