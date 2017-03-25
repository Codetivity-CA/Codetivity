var app = angular.module("sampleApp", ["firebase"]);
app.controller("SampleCtrl", function($scope, $firebaseArray) {
    var ref = firebase.database().ref().child("messages");
    // create a synchronized array
    // click on `index.html` above to see it used in the DOM!
    $scope.messages = $firebaseArray(ref);
    $scope.messages.$add({
        text: "hello",
        name: "Nick"
    });
});