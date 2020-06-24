import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyAYpiUbeUC6iwnn6hj4kHSNcbVVTLSPoTA',
  authDomain: 'mytraveltrackingmap.firebaseapp.com',
  databaseURL: 'https://mytraveltrackingmap.firebaseio.com',
  projectId: 'mytraveltrackingmap',
  storageBucket: 'mytraveltrackingmap.appspot.com',
  messagingSenderId: '640743395282',
  appId: '1:640743395282:web:48548b3dfd8980b8cdc20b',
  measurementId: 'G-0PMR9PNM5B',
};
firebase.initializeApp(config);

const database = firebase.database();

export default database;
