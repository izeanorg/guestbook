// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Add Firebase project configuration object here

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAXAaI6aQUAW914mSRgr484VIqdvFTmPm0",
    authDomain: "izeanorg-site.firebaseapp.com",
    databaseURL: "https://izeanorg-site.firebaseio.com",
    projectId: "izeanorg-site",
    storageBucket: "izeanorg-site.appspot.com",
    messagingSenderId: "143641393477",
    appId: "1:143641393477:web:42f2e59a4c13a0ea89e62c",
    measurementId: "G-86Z9M782GJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

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
var ui = new firebaseui.auth.AuthUI(firebase.auth());
// Listen to RSVP button clicks
startRsvpButton.addEventListener("click",
 () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      firebase.auth().signOut();
    } else {
      // No user is signed in; allows user to sign in
      ui.start("#firebaseui-auth-container", uiConfig);
    }
});
// Listen to the current Auth state
firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
    startRsvpButton.innerText = "LOGOUT"
    // Show guestbook to logged-in users
    guestbookContainer.style.display = "block"
  }
  else {
    startRsvpButton.innerText = "RSVP"
    // Hide guestbook for non-logged-in users
    guestbookContainer.style.display = "none"
  }
});
// Listen to the form submission
form.addEventListener("submit", (e) => {
  // Prevent the default form redirect
  e.preventDefault();
  // Write a new message to the database collection "guestbook"
  firebase.firestore().collection("guestbook").add({
    text: input.value,
    timestamp: Date.now(),
    name: firebase.auth().currentUser.displayName
  })
  input.value = "";  // clears message input field
  // Return false to avoid redirect.
  return false;
});

// Create query for messages
firebase.firestore().collection("guestbook")
.orderBy("timestamp","desc")
.onSnapshot((snaps) => {
  // Reset page
  logbook.innerHTML = "";
  // Loop through documents in database
  snaps.forEach((doc) => {
    // Create an HTML entry for each document and add it to the chat
    let entry = document.createElement("h4");
    entry.textContent = doc.data().name + ": " + doc.data().text;
    logbook.appendChild(entry);
  });
});