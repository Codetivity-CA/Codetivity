
var codeMirror;

function startFirepad(){

  //// Get Firebase Database reference.
  // THIS IS THE HASH CODE???
  var firepadRef = getFileHash();

  //// Create CodeMirror (with line numbers and the JavaScript mode).
  codeMirror = CodeMirror(document.getElementById('firepad-container'), {
    lineNumbers: true,
    mode: 'javascript'
  });

  //// Create Firepad.
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror, {
    defaultText: '/********************************\n *\t\t\t\t\t\t\t\t*\n *    Welcome to Codetivity!\t*\n *\t\t\t\t\t\t\t\t*\n ********************************/\n\n// TODO: type code here and be awesome\n'
  });

}

// Helper to get hash from end of URL or generate a random one.
function getFileHash() {
    // TODO: implement error checking on currentUser == null
  var ref = firebase.database().ref( firebase.auth().currentUser.uid );
  var hash = window.location.hash.replace(/#/g, '');
  if (hash) {
    ref = ref.child(hash);
  } else {
    ref = ref.push(); // generate unique location.
    window.location = window.location + '#' + ref.key; // add it as a hash to the URL.
  }
  if (typeof console !== 'undefined') {
    console.log('Firebase data: ', ref.toString());
  }

  $("#shareLink").html(ref.key);
  $("#shareClickable").attr("href", "https://codetivity.herokuapp.com/#" + ref.key);
  document.getElementById("linkHolder").value = "https://codetivity.herokuapp.com/#" + ref.key;

  return ref;
}


// Function to download data to a file
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