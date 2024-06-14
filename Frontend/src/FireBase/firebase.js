import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDeLuj43eOijcAgn06zzj6pgW08LAKYWdo",
  authDomain: "urban-market-ace1c.firebaseapp.com",
  projectId: "urban-market-ace1c",
  storageBucket: "urban-market-ace1c.appspot.com",
  messagingSenderId: "65306078356",
  appId: "1:65306078356:web:baef438870d33e08a31881",
  measurementId: "G-9EH108LKKH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
