/**
 * Created by alexmadrzyk on 3/11/17.
 */

/**
 * POPUP FOR ONLINE MEMBERS
 */
var onlineMembers = $("#onlineMembers");
var popup = $("#popup");

onlineMembers.hover(pushUp, pushDown);
popup.hover(pushUp, pushDown);

function pushUp(){
    onlineMembers.css("bottom", "10%");
    popup.css("height", "10%");
}

function pushDown(){
    onlineMembers.css("bottom", "5%");
    popup.css("height", "5%");
}

$('[data-toggle="popover"]').popover();


/**
 * CLIPBOARD COPY
 */
(function(){
    new Clipboard('#copy-button');
})();