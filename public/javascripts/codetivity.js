
/**
 * Popup for online members
 */
var onlineMembers = $("#onlineMembers");
var popup = $("#popup");

onlineMembers.hover(pushUp, pushDown);
popup.hover(pushUp, pushDown);

function pushUp(){
    onlineMembers.css("bottom", "15%");
    popup.css("height", "15%");
}

function pushDown(){
    onlineMembers.css("bottom", "1%");
    popup.css("height", "1%");
}

$('[data-toggle="popover"]').popover();



/**
 * Clipboard copy
 */
(function(){
    new Clipboard('#copy-button');
})();



/**
 * When Sign Out button is Clicked
 */
function toggleSignOut(){
    firebase.auth().signOut().then(function(){
        $('userName').html('Logged out.');
        location.href = "/";
    });
}



/**
 * Populate files
 */
function populateFiles(){
    var ref = firebase.database().ref( firebase.auth().currentUser.uid );
    ref.on('value', function(snapshot){
        snapshot = snapshot.val();
        showFilesOnScreen(snapshot);
    });
}

function showFilesOnScreen(snapshot){
    var fileDiv = $('#left');
    fileDiv.empty();
    var files = snapshot['files'];
    var shared = snapshot['sharedWithYou']; // All shared file keys

    // POPULATE FILES
    fileDiv.append('<div><div id="yourFilesHeader" class="section-header" data-stickonscroll="yourFilesHeader" data-stickyType="element">' +
        '<h2>&nbsp;Your Files</h2>' +
        '</div></div>');

    // loop through files
    Object.keys(files).forEach(function(key,index){
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        var name;
        if (files[key].hasOwnProperty('name')) name = files[key]['name'];
        else name = 'BLEH';

        fileDiv.append(
            '<h5 class="hoverFile">' +
                '<i class="material-icons">description</i>' +
                '<a href="#" data-type="text" data-container="body" data-title="Enter File Name" class="editableName">' + name + '</a>' +
            '</h5>');
    });


    fileDiv.append('<div><div id="sharedWithYouHeader" class="section-header" data-stickonscroll="sharedWithYouHeader" data-stickyType="element">' +
        '<h2>&nbsp;Files Shared with You</h2>' +
        '</div></div>');

    // loop through shared files
    Object.keys(shared).forEach(function(key,index){
        var name;
        if (shared[key].hasOwnProperty('name')) name = shared[key]['name'];
        else name = 'BLEH2';

        fileDiv.append(
            '<h5 class="hoverFile">' +
                '<i class="material-icons">description</i>' +
                '<a href="#" data-type="text" data-container="body" data-title="Enter File Name" class="editableName">' + name + '</a>' +
            '</h5>');
    });

    // make each element editable
    $('.editableName').each(function(index, element){
        $(element).editable();
    });

    $('.hoverFile').each(function(index, element){
        $(element).hover(
            function(){
                $(this).css('background-color', '#eeeeee');
            },
            function(){
                $(this).css('background-color', 'white');
            });
    });

    $('.editable-submit').each(function(index, element){
        $(element).on()
    });



    // LINK HEADERS TO STICKY JS
    // $("#yourFilesHeader")
    //     .stickOnScroll({
    //         viewport:           $("#left"),
    //         footerElement:      $("#sharedWithYouHeader").parent(),
    //         setParentOnStick:   true,
    //         setWidthOnStick:    true
    //     });
    // $("#sharedWithYouHeader")
    //     .stickOnScroll({
    //         viewport:           $("#left"),
    //         setParentOnStick:   true,
    //         setWidthOnStick:    true
    //     });
}
