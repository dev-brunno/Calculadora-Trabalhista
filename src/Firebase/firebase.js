import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAO8d-MYanZe1vspfPqvQ7LY8bxDXvIcJo',
  authDomain: 'calcwebapp.firebaseapp.com',
  projectId: 'calcwebapp',
  storageBucket: 'calcwebapp.appspot.com',
  messagingSenderId: '78399243621',
  appId: '1:78399243621:web:1224cc1cc0e762c6594d8c',
};

const app = initializeApp(firebaseConfig);

export default app;
