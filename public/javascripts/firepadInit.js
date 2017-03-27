
/**
 * Global Variables
 */
var codeMirror;
var DEBUG = true;


/**
 * Starts up firepad loading once logged-in user is resolved
 */
function startFirepad(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Get Firebase Database reference, and load Firepad using that reference
            getFileHash(loadFirepad);

            $("#userName").html('<b>Logged in as:</b>&nbsp;&nbsp;' + firebase.auth().currentUser.email);
        }
        else {
            alert("Signed out.");
            location.href = '/login';
        }
    });
}


/**
 * Loads firepad on the screen
 * @param firepadRef – reference to Firepad instance in Firebase database
 */
function loadFirepad(firepadRef){
    $('.firepad-container').empty();

    var userId = firebase.auth().currentUser.uid.toString();

    // Create an instance of CodeMirror (with line numbers and the JavaScript mode)
    codeMirror = CodeMirror(document.getElementById('firepad-container'), {
        lineNumbers: true,
        mode: 'javascript'
    });

    // Create Firepad
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        defaultText: '/********************************\n *\t\t\t\t\t\t\t\t*\n *    Welcome to Codetivity!\t*\n *\t\t\t\t\t\t\t\t*\n ********************************/\n\n// TODO: type code here and be awesome\n',
        userId: userId
    });

    FirepadUserList.fromDiv(firepadRef.child('users'), document.getElementById('popup'), userId);
}


/**
 * Helper function to get hash of file to load in Firepad
 * http://localhost:3000/code?uid=pEF8KpkzmOhFEZl7LcaJMNColqx1&file=-Kfco1fqJ9IW-m0hs5GE
 */
function getFileHash(callback) {

    // If params given in URL, decode them
    var params = window.location.search.substr(1).split('&');
    var uid, file;
    if (params != null && params.length == 2){
        uid = decodeURIComponent(params[0].split('=')[1]);
        file = decodeURIComponent(params[1].split('=')[1]);
    }
    else {
        uid = firebase.auth().currentUser.uid;
        file = null;
    }

    // find user id in database (if it doesn't exist, this will create one)
    var ref = firebase.database().ref( uid + '/files' );

    // loads the file IF it exists in the /files folder, otherwise creates a new one
    ref.once("value", function(snapshot) {

        snapshot = snapshot.val();
        var fileExistsInUid;
        if (snapshot == null){
            fileExistsInUid = false;
        }
        else {
            fileExistsInUid = file && snapshot.hasOwnProperty(file);
        }

        // if file was given in URL, and it exists in database
        if (fileExistsInUid) {
            ref = ref.child(file);

            // add link to your shared files if URL does not come from your account
            if (uid !== firebase.auth().currentUser.uid) {
                addLinkToFile(uid, file);
            }
        }
        else {
            if(file && !fileExistsInUid) {
                alert("Could not find file specified by link. Creating new file instead.");
            }

            // generate unique location at your own uid
            ref = firebase.database().ref( firebase.auth().currentUser.uid + '/files' ).push();
            window.history.pushState(null, null, 'code?uid=' + uid + '&file=' + ref.key); // update url

            // Add attributes such as filename and chat folder
            var newObj = {'name' : 'New File'};
            var chatContainer = {};
            var chatMessage = {'from' : 'ChatBot', 'body': 'Type here to send your first message.'};
            chatContainer['*firstMessage'] = chatMessage;
            newObj['chat'] = chatContainer;
            firebase.database().ref( firebase.auth().currentUser.uid + '/files/' + ref.key ).update(newObj);
        }

        // log
        if (DEBUG && typeof console !== 'undefined') {
            console.log('Firebase data: ', ref.toString());
        }

        // update link holder with link
        document.getElementById("linkHolder").value = 'https://codetivity.herokuapp.com/code?uid=' + uid + '&file=' + ref.key;
        shareCurrentHash(ref.key, uid);
        populateFiles();

        callback(ref);
    });
}


/**
 * If you're given a link from a new user / a new file, this will add a reference to it to your account
 * @param uid – uid of shared file (not your uid)
 * @param file – link to file belonging to that uid
 */
function addLinkToFile(uid, file){

    var ref = firebase.database().ref( firebase.auth().currentUser.uid );

    ref.once('value', function(snapshot) {

        snapshot = snapshot.val();

        // first make sure user has 'sharedWithYou' folder
        if (!snapshot.hasOwnProperty('sharedWithYou')){
            if (DEBUG) {
                alert("Creating shared folder");
            }

            var newFileObj = {};
            newFileObj[file] = uid;
            var newObj = {};
            newObj['sharedWithYou'] = newFileObj;

            ref.update(newObj);
        }
        // 'sharedWithYou' already exists
        else {
            snapshot = snapshot['sharedWithYou'];
            ref = ref.child('sharedWithYou');

            // if database contains doesn't contain file, add it
            if (!snapshot.hasOwnProperty(file)) {
                ref.update({file: uid});
            }
        }
    });
}


/**
 * Function to download data to a file
 */
function saveFile() {
    var data = codeMirror.getValue();
    var filename = prompt("Set file name:");
    if(!filename) return;
    var type = "text/plain;charset=utf-8";
    var a = document.createElement("a"),
        file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

function loadfile(input){
   var reader = new FileReader();
   reader.onload = function(e) {
    codeMirror.setValue(e.target.result);};
   reader.readAsText(input.files[0]);
}