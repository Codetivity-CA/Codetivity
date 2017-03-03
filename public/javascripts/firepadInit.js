
var codeMirror;

function startFirepad(){

  // Initialize Firebase
  var settings = {
      apiKey: "AIzaSyB3QZBjTDzoG50Aq-7sOwPfDTS7MGNKBO8",
      authDomain: "codetivity-89e7c.firebaseapp.com",
      databaseURL: "https://codetivity-89e7c.firebaseio.com",
      storageBucket: "codetivity-89e7c.appspot.com",
      messagingSenderId: "1022467561792"
  };
  firebase.initializeApp(settings);

  //// Get Firebase Database reference.
  // THIS IS THE HASH CODE???
  var firepadRef = getFileHash();

  //// Create CodeMirror (with line numbers and the JavaScript mode).
  codeMirror = CodeMirror(document.getElementById('firepad-container'), {
    lineNumbers: true,
    mode: 'javascript'
  });

  //// Create Firepad.
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror);

}

// Helper to get hash from end of URL or generate a random one.
function getFileHash() {
  var ref = firebase.database().ref();
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

  return ref;
}

// function saveFile(){
//   var textContents = codeMirror.getValue(); // i think in the project editor was called codeMirror
//   var fileAsBlob = new Blob([textContents], {type:"text/plain;charset=utf-8"});
//   var fileName = prompt("Enter the name of file"); // user can put the desired extension
//   if(!fileName) return;
//   var downloadLink = document.createElement("a");
//   downloadLink.download = fileName;
//   downloadLink.innerHTML = "Download File";
//   if (window.webkitURL != null){
//       // Chrome allows the link to be clicked
//       // without actually adding it to the DOM.
//       downloadLink.href = window.webkitURL.createObjectURL(fileAsBlob);
//   }
//   else{
//       // Firefox requires the link to be added to the DOM
//       // before it can be clicked.
//       downloadLink.href = window.URL.createObjectURL(fileAsBlob);
//       downloadLink.onclick = destroyClickedElement;
//       downloadLink.style.display = "none";
//       document.body.appendChild(downloadLink);
//   }
//   downloadLink.click();
// }

// Function to download data to a file
function saveFile() {
    var data = codeMirror.getValue();
    var filename = "test";
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