import firebase from 'firebase';
require('@firebase/firestore');

var firebaseConfig = {
    apiKey: "AIzaSyAY4mioTRqOJAMaNRk7BY-BmZzhu9U5nps",
    authDomain: "barter-system-app-9ef9d.firebaseapp.com",
    projectId: "barter-system-app-9ef9d",
    storageBucket: "barter-system-app-9ef9d.appspot.com",
    messagingSenderId: "246141839348",
    appId: "1:246141839348:web:6b5a2f23276ad147747ba1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore();