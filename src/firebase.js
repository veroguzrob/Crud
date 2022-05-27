  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-app.js";
  import { getFirestore, collection, addDoc,  getDocs, onSnapshot, doc, deleteDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.8.0/firebase-firestore.js"

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDnCksx1LkejY5kfklO3gSQcBae56tb9u4",
    authDomain: "crud-fazt-exercise.firebaseapp.com",
    projectId: "crud-fazt-exercise",
    storageBucket: "crud-fazt-exercise.appspot.com",
    messagingSenderId: "281332039825",
    appId: "1:281332039825:web:b5f045558abcffeb2abf30"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Firestore
  const db = getFirestore(app)

  export const saveTask = (title, description) => addDoc(collection(db, 'tasks'), {title, description})

  export const getTasks = () => getDocs(collection(db, 'tasks'));

  export const onGetTask = (callback) => onSnapshot(collection(db, 'tasks'), callback);

  export const deleteTask = id => deleteDoc(doc(db, 'tasks', id));

  export const getTask = id => getDoc(doc(db, 'tasks', id));

  export const updateTask = (id, newFields) => updateDoc(doc(db, 'tasks', id ), newFields);