
var databse = firebase.database().ref('/');

var ftName = document.getElementById('fname');
var lName = document.getElementById('lname');
var email = document.getElementById('email');
var pass = document.getElementById('password');
var cellNumber = document.getElementById('cell-number');
var age = document.getElementById('age');

function submit() {

    var user = {
        firstName: ftName.value,
        lastName: lName.value,
        mail: email.value,
        pwd: pass.value,
        cellNum: cellNumber.value,
        age: age.value
    }
    firebase.auth().createUserWithEmailAndPassword(user.mail, user.pwd)
    .then(function(response) {
        databse.child('users/'+ response.uid).set(user).then(function() {
            location = 'login/login.html'
        })
    })
    .catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});

}

function signin() {
    location = 'login/login.html'
}