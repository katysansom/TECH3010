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
