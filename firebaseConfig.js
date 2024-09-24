// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcuN6td_Kig0tgNf9XgbE8_0iblKczgX8",
  authDomain: "fb-lib1.firebaseapp.com",
  projectId: "fb-lib1",
  storageBucket: "fb-lib1.appspot.com",
  messagingSenderId: "408063995091",
  appId: "1:408063995091:web:e7c11623cf70a161b67826",
  measurementId: "G-D4C3LYHRQW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};
