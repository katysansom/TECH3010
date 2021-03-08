const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
/*const mostRecentScore = firebase.database('mostRecentScore');*/
const mostRecentScore = localStorage.getItem('mostRecentScore');

/*const highScores = JSON.parse(firebase.database('highScores')) || [];*/ //saves scores and username in the firebase


const highScores = JSON.parse(localStorage.getItem('highScores')) || [];//saves scores and username in the local storage

const MAX_HIGH_SCORES = 10;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;//will display the button if no text is imputted into the username type area
});

saveHighScore = (e) => {
    e.preventDefault(); //stops the defult from submitting to a new page

    const score = {
        score: mostRecentScore,
        name: username.value,
    };
    highScores.push(score);
    highScores.sort((a, b) => b.score - a.score); //will filter scores and only display highest numbers
    highScores.splice(10); //number of highscores to display. any over the top five will be cut off so only top scores are shown

    localStorage.setItem('highScores', JSON.stringify(highScores)); //updates the highscores and saves them in a string
    window.location.assign('index.html'); //automatically goes back home after saving
};

/*local storage means you can only use key value pairs with the value being a string so anything being stored will be stored as a string*/

const firebaseConfig = {
  apiKey: "AIzaSyC2TFmC8aG56DRUUEnK1zk82UXW3CgTtLI",
  authDomain: "tech3010-smartz-mp.firebaseapp.com",
  databaseURL: "https://tech3010-smartz-mp-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tech3010-smartz-mp",
  storageBucket: "tech3010-smartz-mp.appspot.com",
  messagingSenderId: "944526671032",
  appId: "1:944526671032:web:b000aab0c45b3d1a24c84d",
  measurementId: "G-E08G9LVF8J"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Reference messages collection
var messagesRef = firebase.database().ref('mostRecentScore');

$('#contactForm').submit(function(e) {
  e.preventDefault();

  var newMessageRef = messagesRef.push();
  newMessageRef.set({
      name: $('username').val(),
      score: $('finalScore').val(),
  });

  $('.success-message').show();

  $('#contactForm')[0].reset();
});

// NOTE: this shows the data in console
messagesRef.once('value').then((snapshot) => {
  Object.keys(snapshot.val()).forEach((key) => {
      console.log(`Name: ${snapshot.val()[key].name}`);
      console.log(`Score: ${snapshot.val()[key].score}`);
  });
});


// NOTE: this is meant to show data in html but its not printing the score
messagesRef.on("child_added", function(data){
  childScore = data.val();
  document.getElementById("scores").innerHTML += childScore.name + "-" + childScore + "<br>";
});
