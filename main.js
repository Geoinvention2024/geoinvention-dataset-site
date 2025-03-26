// Firebase initialization
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDzmWDaBLZaNE-S1PH-34snH3HmjauJqlM",
  authDomain: "geoinvention-dataset.firebaseapp.com",
  projectId: "geoinvention-dataset",
  storageBucket: "geoinvention-dataset.firebasestorage.app",
  messagingSenderId: "178675075633",
  appId: "1:178675075633:web:465f8487c1078fa97c2310"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', 
      navLinks.classList.contains('active'));
  });
}

// Responsive menu setup
function setupResponsiveMenu() {
  if (window.innerWidth <= 576) {
    menuToggle.style.display = 'block';
    navLinks.classList.remove('active');
  } else {
    menuToggle.style.display = 'none';
    navLinks.classList.remove('active');
  }
}

// Handle download button clicks
document.addEventListener('DOMContentLoaded', () => {
  setupResponsiveMenu();
  window.addEventListener('resize', setupResponsiveMenu);
  
  const downloadButtons = document.querySelectorAll('.download-btn');
  
  downloadButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
      e.preventDefault();
      const datasetId = button.dataset.id;
      
      // Check auth state
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          // User is signed in, record download and proceed
          const downloadUrl = `https://example.com/datasets/${datasetId}.zip`;
          
          // Record download in Firestore
          const downloadsRef = collection(db, 'downloads');
          await addDoc(downloadsRef, {
            userId: user.uid,
            datasetId: datasetId,
            timestamp: new Date(),
            email: user.email
          });
          
          window.location.href = downloadUrl;
        } else {
          // No user signed in, redirect to login with return URL
          const currentUrl = window.location.pathname;
          window.location.href = `/login.html?return=${encodeURIComponent(currentUrl)}`;
        }
      });
    });
  });
});

// Initialize auth state for navigation
const authBtn = document.getElementById('auth-btn');
const userEmail = document.getElementById('user-email');

if (authBtn && userEmail) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      userEmail.textContent = user.email;
      authBtn.textContent = 'Logout';
      authBtn.onclick = () => auth.signOut();
    } else {
      userEmail.textContent = '';
      authBtn.textContent = 'Login';
      authBtn.onclick = () => {
        window.location.href = `/login.html?return=${encodeURIComponent(window.location.pathname)}`;
      };
    }
  });
}

export { app, auth, db };
