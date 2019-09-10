import React from 'react';
import firebase from 'firebase/app';
import 'firebase/database';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCDDtpQ6XiqeGgsIyTEL-H9ZJIHVZI5kks",
    authDomain: "todo-project-five.firebaseapp.com",
    databaseURL: "https://todo-project-five.firebaseio.com",
    projectId: "todo-project-five",
    storageBucket: "",
    messagingSenderId: "1054815033844",
    appId: "1:1054815033844:web:0379767e201eda756441a1"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;