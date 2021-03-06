/*Help from https://youtu.be/O4N7yfaJYhI to make this*/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDuejSqZSWsXGYcO1qaILbyIpJJb5jvIUs",
  authDomain: "smartzmultipage.firebaseapp.com",
  databaseURL: "https://smartzmultipage-default-rtdb.firebaseio.com/",
  projectId: "smartzmultipage",
  storageBucket: "smartzmultipage.appspot.com",
  messagingSenderId: "398309169877",
  appId: "1:398309169877:web:daffc48ea2dbe54241a05c",
  measurementId: "G-746DK30RKC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Reference messages collection
var scoresRef = firebase.database().ref("scores/");

const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
console.log(mostRecentScore);

const MAX_HIGH_SCORES = 10;

function addItemsToList(name, score) {
  let ul = document.getElementById("highScoresList");
  let listItem = document.createElement("li"); //the number of highscores shown
  let contents = document.createTextNode(
    "Name: " + name + "   Score: " + score
  );
  listItem.appendChild(contents);
  ul.appendChild(listItem);
}

//calls for the data from database
function FetchAllData() {
  firebase
    .database()
    .ref("scores")
    .once("value", function (snapshot) {
      //a snapshot is a picture of the data at a particular database reference at a single point in time
      snapshot.forEach(function (ChildSnapshot) {
        let name = ChildSnapshot.val().name;
        let score = ChildSnapshot.val().score;
        addItemsToList(name, score);
      });
    });
}

window.onload = () => {
  console.log("Onload function called");
  FetchAllData();
};
