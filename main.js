// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzmWDaBLZaNE-S1PH-34snH3HmjauJqlM",
  authDomain: "geoinvention-dataset.firebaseapp.com",
  projectId: "geoinvention-dataset",
  storageBucket: "geoinvention-dataset.firebasestorage.app",
  messagingSenderId: "178675075633",
  appId: "1:178675075633:web:465f8487c1078fa97c2310"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// 导出 auth 和 db 给其他页面用
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };