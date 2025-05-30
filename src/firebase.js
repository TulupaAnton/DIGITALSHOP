// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDhM_uO_bbhhznpQpKDwKBc1Db5xXqCMpA',
  authDomain: 'shop-90ab9.firebaseapp.com',
  projectId: 'shop-90ab9',
  storageBucket: 'shop-90ab9.firebasestorage.app',
  messagingSenderId: '626165811023',
  appId: '1:626165811023:web:6b5699559e9590da58a73a',
  measurementId: 'G-609BZ9MBSD'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
