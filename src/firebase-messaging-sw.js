import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDu79m_qmgZGcwpuQAPJGDsZ2cGXrgd1eE",
  authDomain: "gameanalysis-mgm12.firebaseapp.com",
  databaseURL: "https://gameanalysis-mgm12-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gameanalysis-mgm12",
  storageBucket: "gameanalysis-mgm12.appspot.com",
  messagingSenderId: "15625157278",
  appId: "1:15625157278:web:9c508e3c7759755dded98f",
  measurementId: "G-1C59CKFJS1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);
