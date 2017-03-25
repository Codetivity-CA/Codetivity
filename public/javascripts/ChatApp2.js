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
        var ref = firebase.database().ref().child(uid).child(file).child('messages');
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


