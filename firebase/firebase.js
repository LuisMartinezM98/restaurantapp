import firebaseConfig from "./config";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


export default {
    firebase,
    db
}