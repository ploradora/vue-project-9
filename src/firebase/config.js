import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDnaF4CLbaIl21Z6juocr1oUZ06xDrf9iM",
  authDomain: "todo-data-a2b34.firebaseapp.com",
  projectId: "todo-data-a2b34",
  storageBucket: "todo-data-a2b34.appspot.com",
  messagingSenderId: "550068670040",
  appId: "1:550068670040:web:ca974526fa5d62a4db842d",
};

firebase.initializeApp(firebaseConfig);

const projectFirestore = firebase.firestore();

export { projectFirestore };
