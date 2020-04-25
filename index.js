// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Add Firebase project configuration object here
// const firebaseConfig = {
// ...
// };


// Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// FirebaseUI config
var uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};

// Document elements
let startRsvpButton = document.getElementById('startRsvp');
let guestbookContainer = document.getElementById('guestbook-container');

let form = document.querySelector('form');
let input = document.querySelector('input');
let logbook = document.getElementById('logbook');
let needed = document.getElementById('needed');

// Initialize the FirebaseUI widget using Firebase
// var ui = new firebaseui.auth.AuthUI(firebase.auth());