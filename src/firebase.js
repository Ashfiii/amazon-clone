import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCJ-1z4SDLPr_8xd9vZkLOrYRyYKtngAok",
    authDomain: "clone-4f1ea.firebaseapp.com",
    databaseURL: "https://clone-4f1ea.firebaseio.com",
    projectId: "clone-4f1ea",
    storageBucket: "clone-4f1ea.appspot.com",
    messagingSenderId: "117774712884",
    appId: "1:117774712884:web:a5bfbb155acec2244bca61"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();

  export {db, auth};