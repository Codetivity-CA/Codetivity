
/**
 * Popup for online members
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
 * Clipboard copy
 */
(function(){
    new Clipboard('#copy-button');
})();


