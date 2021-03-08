// NOTE: tutorial from https://www.youtube.com/watch?v=zpoPh00gqrA


var firebaseConfig = {
  apiKey: "AIzaSyCoCVBhBooyLGH9nSqL74k31x1KCBz-usM",
  authDomain: "smartz-multi-page.firebaseapp.com",
  databaseURL: "https://smartz-multi-page-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "smartz-multi-page",
  storageBucket: "smartz-multi-page.appspot.com",
  messagingSenderId: "625324096237",
  appId: "1:625324096237:web:e23c21f03e438e27f4eae4",
  measurementId: "G-1TCZM9MQEE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Reference messages collection
var messagesRef = firebase.database().ref('scores');

$('#contactForm').submit(function(e) {
  e.preventDefault();

  var newMessageRef = messagesRef.push();
  newMessageRef.set({
      name: $('.fullname').val(),
      score: $('.score').val(),
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
