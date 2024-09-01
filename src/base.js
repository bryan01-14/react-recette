import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set, push, update, remove } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBMuN70VIyveRztGeOHexcFPP_dhRTIEmY",
  authDomain: "recette-40f11.firebaseapp.com",
  databaseURL: "https://recette-40f11-default-rtdb.firebaseio.com",
  projectId: "recette-40f11",
  storageBucket: "recette-40f11.appspot.com",
  messagingSenderId: "686770650282",
  appId: "1:686770650282:web:043790068a1295080364d3",
  measurementId: "G-SKVY01QSKT"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

export { firebaseApp, database, ref, onValue, set, push, update, remove };
