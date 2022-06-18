import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBGPh5bt9CZTx_H4R3HwwoZSpNxREY45-g",
  authDomain: "surelys-variedades-shop.firebaseapp.com",
  projectId: "surelys-variedades-shop",
  storageBucket: "surelys-variedades-shop.appspot.com",
  messagingSenderId: "957680184579",
  appId: "1:957680184579:web:a92a3e9dd0c3e3b6624d36",
  measurementId: "G-01SJ1FS44X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);