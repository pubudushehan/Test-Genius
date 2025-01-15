import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA2LcKY4WOp1qZyy7-0jmW-TVzh1s7XXio",
  authDomain: "quiz-app-project-b1848.firebaseapp.com",
  projectId: "quiz-app-project-b1848",
  storageBucket: "quiz-app-project-b1848.appspot.com",
  messagingSenderId: "234655357225",
  appId: "1:234655357225:web:8ac0707a43d7a96a9d3f38",
  measurementId: "G-15JBQ89GF2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

googleProvider.setCustomParameters({
  prompt: 'select_account'
});

export { auth, googleProvider, analytics }; 