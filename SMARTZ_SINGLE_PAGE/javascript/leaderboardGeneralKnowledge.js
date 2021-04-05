/*Help from https://youtu.be/O4N7yfaJYhI to make this*/

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
   apiKey: "AIzaSyCMFs71IzGS2hz5FOl8QMVbGTeG-fnI3hE",
   authDomain: "smartzsinglepage-9c0f9.firebaseapp.com",
   databaseURL: "https://smartzsinglepage-9c0f9-default-rtdb.firebaseio.com/",
   projectId: "smartzsinglepage-9c0f9",
   storageBucket: "smartzsinglepage-9c0f9.appspot.com",
   messagingSenderId: "779676739645",
   appId: "1:779676739645:web:bdecf4c0c3517918a5a254",
   measurementId: "G-91NHFX7CB9"
 };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
// Reference messages collection
var scoresRef = firebase.database().ref("general/");

const username_GK_END = document.getElementById("username");
const saveScoreBtn_GK_END = document.getElementById("saveScoreBtn");
const finalScore_GK_END = document.getElementById("finalScore");
const mostRecentScore_GK_END = localStorage.getItem("mostRecentScore");
console.log(mostRecentScore);

const MAX_HIGH_SCORES_GK_END = 10;


function addItemsToList(name, score) {
  let ul = document.getElementById("highScoresList");
  let listItem = document.createElement("li"); //the number of highscores shown
  let contents = document.createTextNode(
    "Name: " + name +  "   Score: " + score
  );
  listItem.appendChild(contents);
  ul.appendChild(listItem);
}


//calls for the data from database
function FetchAllData() {
  firebase
    .database()
    .ref("general")
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
