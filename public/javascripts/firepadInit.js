
/**
 * Global Variables
 */
var codeMirror;


/**
 * Starts up firepad loading once logged-in user is resolved
 */
function startFirepad(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // Get Firebase Database reference, and load Firepad using that reference
            var firepadRef = getFileHash();
            loadFirepad(firepadRef);
        }
        else {
            alert("You logged out!");
        }
    });
}


/**
 * Loads firepad on the screen
 * @param firepadRef – reference to Firepad instance in Firebase database
 */
function loadFirepad(firepadRef){
    // Create an instance of CodeMirror (with line numbers and the JavaScript mode)
    codeMirror = CodeMirror(document.getElementById('firepad-container'), {
        lineNumbers: true,
        mode: 'javascript'
    });

    // Create Firepad
    var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
        defaultText: '/********************************\n *\t\t\t\t\t\t\t\t*\n *    Welcome to Codetivity!\t*\n *\t\t\t\t\t\t\t\t*\n ********************************/\n\n// TODO: type code here and be awesome\n'
    });
}


/**
 * Helper function to get hash from end of URL or generate a random one
 */
function getFileHash() {

    // Find user id in database
    var ref = firebase.database().ref( firebase.auth().currentUser.uid );

    // If hash exists
    var hash = window.location.hash.replace(/#/g, '');
    if (hash) {
        ref = ref.child(hash);
    }
    else {
        ref = ref.push(); // generate unique location.
        window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
    }

    // Log
    if (typeof console !== 'undefined') {
        console.log('Firebase data: ', ref.toString());
    }

    // Update link holder with link
    document.getElementById("linkHolder").value = "https://codetivity.herokuapp.com/#" + ref.key;

    return ref;
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