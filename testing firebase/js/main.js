// NOTE: using https://artisansweb.net/how-to-connect-firebase-realtime-database-to-your-website-form/ to set up firebase to js



  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
var messagesRef = firebase.database().ref('contactformmessages');

$('#contactForm').submit(function(e) {
    e.preventDefault();

    var newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: $('.fullname').val(),
        email: $('.email').val(),
        subject: $('.subject').val(),
        message: $('.message').val()
    });

    $('.success-message').show();

    $('#contactForm')[0].reset();
});

messagesRef.once('value').then((snapshot) => {
    Object.keys(snapshot.val()).forEach((key) => {
        console.log(`Name: ${snapshot.val()[key].name}`);
        console.log(`Email: ${snapshot.val()[key].email}`);
        console.log(`Subject: ${snapshot.val()[key].subject}`);
        console.log(`Message: ${snapshot.val()[key].message}`);
    });
});
