
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

  $("#shareLink").html(ref.key);
  $("#shareClickable").attr("href", "https://codetivity.herokuapp.com/#" + ref.key);

  return ref;
}