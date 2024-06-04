// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  ref,
  child,
  get,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"; //firebase database
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5Yss5ACigKc0C-PyUDZSZQ3q-CZ4SAs4",
  authDomain: "fir-project-e99b4.firebaseapp.com",
  databaseURL: "https://fir-project-e99b4-default-rtdb.firebaseio.com",
  projectId: "fir-project-e99b4",
  storageBucket: "fir-project-e99b4.appspot.com",
  messagingSenderId: "342637259954",
  appId: "1:342637259954:web:68d24febed27673c9cadab",
  measurementId: "G-03RDCJ3YGN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase();

const messages = ref(database, "messages"); //create reference to messages collection and specify the string of which data we want

onValue(
  messages,
  (snapshot) => {
    console.log(snapshot);

    const ul = document.getElementById("messages");

    ul.replaceChildren(); //reset and clear list before anything in database changes so it wont continue to add on to the list with repeated values

    snapshot.forEach((childSnapShot) => {
      console.log(childSnapShot.key);
      console.log(childSnapShot.val());

      const childData = childSnapShot.val();

      const text = document.createTextNode(
        childData.message + " ~ " + childData.name
      );
      const li = document.createElement("li");

      li.appendChild(text);
      ul.appendChild(li);
    });
  } //copy of the messages data at the time of the event
); //this function will run everytime it receives a database (once data changes and is fetched)