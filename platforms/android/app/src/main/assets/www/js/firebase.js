// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBayBLRc2DBNwwjG-onz5frwp-ulLZK7b0",
  authDomain: "biblia-sagrada-almeida-908d3.firebaseapp.com",
  databaseURL: "https://biblia-sagrada-almeida-908d3.firebaseio.com",
  projectId: "biblia-sagrada-almeida-908d3",
  storageBucket: "biblia-sagrada-almeida-908d3.appspot.com",
  messagingSenderId: "523477231521",
  appId: "1:523477231521:web:0ba38dc311f041828f0de0",
  measurementId: "G-9M1Y16LY1C"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase.auth().signInAnonymously().catch(function(error) {
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(errorMessage)
});