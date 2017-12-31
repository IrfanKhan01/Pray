
var database = firebase.database().ref('/');


function signup() {
    location = '../index.html';
}

var email = document.getElementById('email');
var pass = document.getElementById('password');

function login() {
    var user = {
        email: email.value,
        pwd: pass.value
    };

    firebase.auth().signInWithEmailAndPassword(user.email, user.pwd)
    .then(function(res) {
        database.child('users/' + res.uid).once('value', function (snapshot) {
            // localStorage.setItem('UID', snapshot.key);
            var convert = JSON.stringify(snapshot.val())
            localStorage.setItem('loggedInUser', convert)
            location = '../home/home.html';
            
            // console.log(convert);
        });
    })

    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
}