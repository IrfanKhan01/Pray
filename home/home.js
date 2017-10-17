

var database = firebase.database().ref('/');

var data = localStorage.getItem('loggedInUser');
var userData = JSON.parse(data);

var name = document.getElementById('name').innerHTML = userData.firstName + ' '+ userData.lastName;
console.log(userData);
function signout() {
    // var usr = {
    //     email:userData.mail,
    //     pass:userData.pwd
    // };
    firebase.auth().signOut().then(function() {
        location = '../login/login.html';
      }).catch(function(error) {
        // An error happened.
      });   
}

var dua = document.getElementById('post');
var senderName = document.getElementById('sender-name');


function praySubmit() {
  var obj = {
      pray: dua.value,
      userName: senderName.value
  }
  database.child('post').push(obj)
  dua.value = "";
  senderName.value = '';
  senderName.focus();
}

function feed() {
  location = 'feeds/feeds.html'
}

function profile() {
  location = 'profile/profile.html'
}