import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
  where,
  query,
} from "firebase/firestore";
import { v4 } from "uuid";

const debName = {
  user: "Users",
  order: "Orders",
  config: "Config",
};

class Firebase {
  static config = {
    apiKey: "AIzaSyAF9T7bJ8Q3JrGTnglrkIG3HDKXe25zIzw",
    authDomain: "loginss-ef31b.firebaseapp.com",
    databaseURL:
      "https://loginss-ef31b-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "loginss-ef31b",
    storageBucket: "loginss-ef31b.appspot.com",
    messagingSenderId: "24215494873",
    appId: "1:24215494873:web:39957d3f901176dda95ec8",
    measurementId: "G-4THNBBYCZM",
  };
  static instance;
  #app;
  #auth;
  dbClient;
  #provider;
  async signIn() {
    return await signInWithPopup(this.#auth, this.#provider);
  }

  async createUserWithEmailAndPassword(email, password) {
    return await createUserWithEmailAndPassword(email, password);
  }

  async signInWithEmailAndPassword(email, password) {
    return await signInWithEmailAndPassword(this.#auth, email, password);
  }

  signOut(callback) {
    return () => signOut(this.#auth).then(callback);
  }
  onAuthStateChanged(callback) {
    return onAuthStateChanged(this.#auth, callback);
  }
  getColl = (nameCollection) => collection(this.dbClient, nameCollection);
  async fetchData() {
    const citiesRef = this.getColl(debName.user);
    const arr = [];
    (await getDocs(citiesRef)).forEach((val) => {
      arr.push(val.data());
    });
    return arr;
  }
  async setDocUser(body) {
    return await setDoc(doc(this.getColl(debName.user), v4()), body);
  }

  async queryDataUser(cond) {
    let conds = [];
    if (Array.isArray(cond)) {
      conds = cond.map(([a, b, c]) => where(a, b, c));
    }
    const result = await getDocs(query(this.getColl(debName.user), ...conds));

    return result.docs.map((doc) => doc.data())?.[0];
  }

  constructor() {
    this.#app = initializeApp(Firebase.config);
    this.dbClient = getFirestore(this.#app);
    this.#auth = getAuth(this.#app);
    this.#provider = new GoogleAuthProvider();
  }

  static getInstance() {
    if (!Firebase.instance) {
      Firebase.instance = new Firebase();
    }
    return Firebase.instance;
  }
}

export default Firebase.getInstance();
