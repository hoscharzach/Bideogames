import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyDKmIrTEbfarIZ8fHblb02ujqdSLKDqDeE",
    authDomain: "bideogames-b2bf0.firebaseapp.com",
    databaseURL: "https://bideogames-b2bf0-default-rtdb.firebaseio.com",
    projectId: "bideogames-b2bf0",
    storageBucket: "bideogames-b2bf0.appspot.com",
    messagingSenderId: "966516030209",
    appId: "1:966516030209:web:34e73a3d32a2f9b1cb3900",
    measurementId: "G-883KEVQM9D"
};

const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
