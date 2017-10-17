var database = firebase.database().ref('/');

var data = localStorage.getItem('loggedInUser');
var userData = JSON.parse(data);


console.log(userData);
var firstName = document.getElementById('first-name').innerHTML = userData.firstName;
var lastName = document.getElementById('last-name').innerHTML = userData.lastName;
var email = document.getElementById('email').innerHTML = userData.mail;
var cellNumber = document.getElementById('cell-number').innerHTML = userData.cellNum;
var age = document.getElementById('age').innerHTML = userData.age;

function signout() {
   
    firebase.auth().signOut().then(function() {
        location = '../../login/login.html';
      }).catch(function(error) {
        // An error happened.
      });   
}

function feed() {
    location = '../feeds/feeds.html';
}
function profile() {
    location = 'profile.html'
}