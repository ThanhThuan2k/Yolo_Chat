// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, uploadBytes } from "firebase/storage";
import "firebase/auth";
import "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCTz2-EvLTWW-DO49uRBelOmstT89CdDeI",
    authDomain: "chatwithme-21fae.firebaseapp.com",
    databaseURL: "https://chatwithme-21fae-default-rtdb.firebaseio.com",
    projectId: "chatwithme-21fae",
    storageBucket: "chatwithme-21fae.appspot.com",
    messagingSenderId: "834062988266",
    appId: "1:834062988266:web:f9876d8eca8f1f065b7893"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const firestore = getFirestore();
const storage = getStorage();

export { db, app, firestore, storage };