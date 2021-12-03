// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Required for side-effects
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAmzrDLfET78aa_yT1CNoiv96-EQgmUsWY",
  authDomain: "largepoolmining.firebaseapp.com",
  projectId: "largepoolmining",
  storageBucket: "largepoolmining.appspot.com",
  messagingSenderId: "535076700464",
  appId: "1:535076700464:web:91168430025a4f8ab148f5",
  measurementId: "G-2HD2EGQZHG"
};

let app = initializeApp(firebaseConfig)
export let db = getFirestore(app)
export let auth = getAuth(app)