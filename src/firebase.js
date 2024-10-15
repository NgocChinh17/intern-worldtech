import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBwuyC2Kdc6r6eCFl45yEE2XBRVp7XLXlE",
  authDomain: "login-6a7a1.firebaseapp.com",
  projectId: "login-6a7a1",
  storageBucket: "login-6a7a1.appspot.com",
  messagingSenderId: "127728123406",
  appId: "1:127728123406:web:9e70438394e239ca03c65f",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { auth, provider }
