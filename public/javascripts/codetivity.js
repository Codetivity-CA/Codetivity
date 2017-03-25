
/**
 * Popup for online members
 */
var onlineMembers = $("#onlineMembers");
var popup = $("#popup");

onlineMembers.hover(pushUp, pushDown);
popup.hover(pushUp, pushDown);

function pushUp(){
    onlineMembers.css("bottom", "15%");
    popup.css("height", "15%");
}

function pushDown(){
    onlineMembers.css("bottom", "1%");
    popup.css("height", "1%");
}

$('[data-toggle="popover"]').popover();

/**
 * Chat
 */
$('#sendMessage').on('click', function(){
    $('#messageField').val('');
});

/**
 * Clipboard copy
 */
(function(){
    new Clipboard('#copy-button');
})();



/**
 * When Sign Out button is Clicked
 */
function toggleSignOut(){
    firebase.auth().signOut().then(function(){
        $('userName').html('Logged out.');
        location.href = "/";
    });
}



/**
 * Populate files
 */
function populateFiles(){
    var ref = firebase.database().ref( firebase.auth().currentUser.uid);
    ref.on('value', function(snapshot){
        snapshot = snapshot.val();

        $('#usersFiles').html( JSON.stringify(Object.keys(snapshot['files'])) );
        $('#sharedFiles').html( JSON.stringify(snapshot['sharedWithYou']) );
    });
}

