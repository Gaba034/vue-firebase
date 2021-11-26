import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCZnLTG62wmAmsJjh_1fgkjtuKptgZjINA",
    authDomain: "secondchild-9db82.firebaseapp.com",
    projectId: "secondchild-9db82",
    storageBucket: "secondchild-9db82.appspot.com",
    messagingSenderId: "363299350063",
    appId: "1:363299350063:web:439a239c39c1cc2d5008da"
  };

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
  
const profileCollection = db.collection('profile')
const tasksCollection = db.collection('tasks')
  
export {
    db, auth, profileCollection, tasksCollection, googleProvider
}
