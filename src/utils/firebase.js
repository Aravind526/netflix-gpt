// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2A6AmGuIhpIeJvxHaq5Hq80S44HwXqXU",
  authDomain: "netflixgpt-55a16.firebaseapp.com",
  projectId: "netflixgpt-55a16",
  storageBucket: "netflixgpt-55a16.appspot.com",
  messagingSenderId: "470423569977",
  appId: "1:470423569977:web:78e3e8f528c6632ec92fe8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();