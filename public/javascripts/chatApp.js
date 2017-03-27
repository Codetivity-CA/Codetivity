var app = angular.module("myapp", ["firebase"]);

function MyController($scope, $firebaseArray) {
	// only populate chat once you're logged in
    firebase.auth().onAuthStateChanged(function(user) {
    	if (user) {
            checkVariable(user, $scope, $firebaseArray);
        }
    });
}

function remainderOfAngularCode(user, $scope, $firebaseArray){
	var name = user['email'];

	var ref = firebase.database().ref( currentFilesOwner + '/files/' + currentFile + '/chat');
	$scope.messages = $firebaseArray(ref);

	$scope.addMessage = function(e) {
		if (e.keyCode != 13) return;

		$scope.messages.$add({from: name, body: $scope.msg});
		$scope.msg = "";
	};
}

function checkVariable(user, $scope, $firebaseArray){
    if (typeof user !== 'undefined' && typeof currentFile !== 'undefined' && typeof currentFilesOwner !== 'undefined') {
        remainderOfAngularCode(user, $scope, $firebaseArray);
    } else {
        window.setInterval(function(){checkVariable(user, $scope, $firebaseArray)}, 500);
	}
}
