import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCOcRG4j4s8DA28UKrm-3lgmXhSx89cMFw",
    authDomain: "h-blog-413d3.firebaseapp.com",
    projectId: "h-blog-413d3",
    storageBucket: "h-blog-413d3.appspot.com",
    messagingSenderId: "1004854337339",
    appId: "1:1004854337339:web:8b016bd4ab914a4e14e11e"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebaseApp.firestore();
