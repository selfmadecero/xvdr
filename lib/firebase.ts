import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCIjETlnFMi6wqPwCupx28cKotBr-B7ECg',
  authDomain: 'xvdr-75fa9.firebaseapp.com',
  projectId: 'xvdr-75fa9',
  storageBucket: 'xvdr-75fa9.firebasestorage.app',
  messagingSenderId: '489312529796',
  appId: '1:489312529796:web:50ad10be1e1432f85ac1d1',
  measurementId: 'G-JDDLPYS382',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
