


function signout() {
    firebase.auth().signOut().then(function() {
        location = '../../login/login.html';
      }).catch(function(error) {
        // An error happened.
      });   
}

var uID = localStorage.getItem('UID');

var database = firebase.database().ref('/');

var checkLikes = false;
var likeCounter = 0;
var body = document.getElementById('body');

var loggedIN = JSON.parse(localStorage.getItem('loggedInUser'))

database.child('post').on("child_added", function (snap) {
    var obj = snap.val();
    obj.key = snap.key

    var div1 = document.createElement("DIV")
    div1.setAttribute("class", "card crd1");
    div1.setAttribute("id", obj.key);
    div1.setAttribute("style", "width: 100%")
    var div2 = document.createElement("DIV")
    div2.setAttribute("class", "card-body para")
    var h4 = document.createElement("H3")
    h4.setAttribute("class", "card-title heading")
    var p = document.createElement("P")
    p.setAttribute("class", "card-text")

    // comment code
    // var form = document.createElement('form');
    var commentDiv = document.createElement("DIV");
    commentDiv.setAttribute("class", "input-group");

    var input = document.createElement("INPUT");
    input.className = "form-control";

    var span = document.createElement("SPAN");
    span.className = "input-group-btn";

    var button = document.createElement("INPUT");
    button.type = "submit"
    button.className = "btn btn-warning"
    button.value = "OK"

    button.addEventListener("click", function () {
        var commentOBJ = {
            sender: loggedIN.firstName + ' ' + loggedIN.lastName,
            comment: input.value,
            postUID: obj.key
        }
        database.child('comment').push(commentOBJ)
    })
    span.appendChild(button)
    commentDiv.appendChild(input)
    commentDiv.appendChild(span)
    // form.appendChild(commentDiv);


    
    // comments render
    var commentList = document.createElement("DIV");

    var textH4 = document.createTextNode(obj.userName)
    var textP = document.createTextNode(obj.pray)
    h4.appendChild(textH4)
    p.appendChild(textP)
    div2.appendChild(h4)
    div2.appendChild(p)
    div2.appendChild(commentDiv)
    div1.appendChild(div2)
    div1.appendChild(commentList)
    body.appendChild(div1)

})

database.child("comment").on('child_added', function (data) {
    var comment = data.val();
    renderComment(comment);
})

function renderComment(comment) {
    var mainDiv = document.createElement("DIV");
    var bodyDiv = document.createElement("DIV");
    mainDiv.setAttribute("class", "card crd2");
    bodyDiv.setAttribute("class", "card-body");
    var nameDiv = document.createElement('p');
    nameDiv.className = 'text-warning'

    nameDiv.setAttribute('style', 'display:inline; font-weight:bold');
    var nameTxt = document.createTextNode(comment.sender);

    nameDiv.appendChild(nameTxt);
    bodyDiv.appendChild(nameDiv);
    mainDiv.appendChild(bodyDiv);
    var commentText = document.createTextNode(': ' + comment.comment);

    // var likeBtn = document.createElement('BUTTON');
    // likeBtn.className = 'btn btn-outline-info btn-sm';
    var likeSpan = document.createElement('SPAN');
    likeSpan.className = 'material-icons w3-large';
    likeSpan.style.color = 'gray';
    likeSpan.addEventListener('click',function() {
        like(this);
    });
    var likeIcnon = document.createTextNode('thumb_up');
    likeSpan.appendChild(likeIcnon);
    // likeBtn.appendChild(likeSpan);
    bodyDiv.appendChild(commentText)

    bodyDiv.appendChild(likeSpan);

    var postDiv = document.getElementById(comment.postUID);

    var commentDiv = postDiv.lastElementChild;
    commentDiv.appendChild(mainDiv);


   // like function

   var divForBtn = document.getElementById('div-for-like');

   
    function like(x) {
        if (x.style.color === 'gray') {
            x.style.color ='deepskyblue';
            likeCounter++;

            database.child('Like/'+ uID).set(likeCounter);
            console.log(likeCounter);

        }
        else {
            x.style.color = 'gray';
            likeCounter--;
            database.child('Like/'+ uID).set(likeCounter);
            
            console.log(likeCounter);
        } 
      
    }
      
}
database.child('Like/' + uID).on('child_added', function(s) {

    console.log(s.val())
    // if (uID >= 1) {

    //     console.log(uID);
    //     // x.style.color = 'deepskyBlue';
    // }
    // else {
    //     x.style.color = 'gray';
    // }
})








