
var app =  angular.module('chatApp', ['firebase']);
alert("start");
app.controller('chatController', ['$scope','Message', function($scope,Message){
    alert("controller");
    $scope.user=firebase.auth().currentUser.email;

    $scope.messages= Message.all;

    $scope.insert = function(message){
        Message.create(message);
    };
}]);

app.factory('Message', ['$firebaseArray',
    function($firebaseArray) {
        alert("factory");
        var ref = firebase.database().ref().child('files');
        var messages = $firebaseArray(ref.limitToLast(100));

        var Message = {
            all: messages,
            create: function (message) {
                return messages.$add(message);
            },
            get: function (messageId) {
                return $firebaseObject(ref.child(messageId));
            },
            delete: function (message) {
                return messages.remove(message);
            }
        };

        return Message;

    }
]);


