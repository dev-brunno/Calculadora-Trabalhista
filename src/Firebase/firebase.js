import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx1yveiisT0t3thk4IBnhtS2UqiPEhwb0",
  authDomain: "calc-trabalhista.firebaseapp.com",
  projectId: "calc-trabalhista",
  storageBucket: "calc-trabalhista.appspot.com",
  messagingSenderId: "771723194366",
  appId: "1:771723194366:web:2d7bd633d72704a8b8daaf",
  measurementId: "G-4XVSZT0PLX"
};

const app = firebase.initializeApp(firebaseConfig);

export default app;
