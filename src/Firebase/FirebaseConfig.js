
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCy_39AVLu-cA7AKXAi3XfgOrGWMawdbhM",
  authDomain: "food-app-760f1.firebaseapp.com",
  projectId: "food-app-760f1",
  storageBucket: "food-app-760f1.appspot.com",
  messagingSenderId: "56153240446",
  appId: "1:56153240446:web:8d42574c70976ccd98b92f"
};


const app = initializeApp(firebaseConfig);  
const db = getFirestore(app);
const storage = getStorage(app);

export {db, storage}
