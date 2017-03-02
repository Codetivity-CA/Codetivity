function firepad_init() {
  //// Initialize Firebase.
  //// TODO: replace with your Firebase project configuration.
  var config = {
    apiKey: "AIzaSyCLgpdM5mcOfkE1uqjZ7Nk9PT-QWo84zHo",
    authDomain: "code-f93dc.firebaseapp.com",
    databaseURL: "https://code-f93dc.firebaseio.com",
    storageBucket: "code-f93dc.appspot.com",
    messagingSenderId: "624601224226"
  };
  firebase.initializeApp(config);

  //// Get Firebase Database reference.
  // THIS IS THE HASH CODE???
  var firepadRef = getExampleRef();

  //// Create CodeMirror (with line numbers and the JavaScript mode).
  var codeMirror = CodeMirror(document.getElementById('firepad-container'), {
    lineNumbers: true,
    mode: 'javascript'
  });

  //// Create Firepad.
  var firepad = Firepad.fromCodeMirror(firepadRef, codeMirror);
}

// Helper to get hash from end of URL or generate a random one.
function getExampleRef() {
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
  return ref;
}