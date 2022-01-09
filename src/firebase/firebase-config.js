import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD0AZGMQbioyW2qoo9lvZAqnG9TgRVGIow",
  authDomain: "personal-cloud-v2.firebaseapp.com",
  projectId: "personal-cloud-v2",
  storageBucket: "personal-cloud-v2.appspot.com",
  messagingSenderId: "695877792210",
  appId: "1:695877792210:web:078e5ede924907b4ab580b",
  measurementId: "G-7J4QC2NKY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore();
