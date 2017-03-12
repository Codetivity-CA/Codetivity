/**
 * Created by alexmadrzyk on 3/11/17.
 */

window.onload = function(){
  initApp();
};

function initApp(){
    firebase.auth().onAuthStateChanged(function(user){
        if (user){

        } else {

        }
    });
}