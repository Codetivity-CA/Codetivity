
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
    onlineMembers.css("bottom", "0%");
    popup.css("height", "0%");
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
var currentFile;
var currentFilesOwner;

function shareCurrentHash(key, user){
    currentFile = key;
    currentFilesOwner = user;
}

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

    // ******* YOUR FILES HEADER ***************************************************************************************
    fileDiv.append(
        '<div>' +
            '<div id="yourFilesHeader" class="section-header">' +
                '<h2>&nbsp;Your Files</h2>' +
            '</div>' +
        '</div>');

    // loop through files
    Object.keys(files).forEach(function(key,index){
        // key: the name of the object key
        // index: the ordinal position of the key within the object
        var name;
        if (files[key].hasOwnProperty('name')) name = files[key]['name'];
        else name = 'New File';

        fileDiv.append(
            '<h5 class="hoverFile nonSharedFile" id=\''+ key +'\'>' +
                '<i class="material-icons">description</i>' +
                '<a href="#" id=\''+ key +'\'data-type="text" data-container="body" data-title="Enter File Name" class="editableName">' + name + '</a>' +
            '</h5>');
    });

    // ******* SHARED FILE HEADER **************************************************************************************
    fileDiv.append(
        '<div>' +
            '<div id="sharedWithYouHeader" class="section-header">' +
                '<h2>&nbsp;Files Shared with You</h2>' +
            '</div>' +
        '</div>');

    // loop through shared files
    if (typeof shared !== 'undefined' || shared != null) {
        Object.keys(shared).forEach(function (key, index) {
            var name;
            if (shared[key].hasOwnProperty('name')) name = shared[key]['name'];
            else name = 'New File'; // To actually load other user's file, you need async call (we didn't have time)

            fileDiv.append(
                '<h5 class="hoverFile sharedFile" id=\'' + key + '\'>' +
                '<i class="material-icons">description</i>' +
                '<a href="#" id=\'' + key + '\'data-type="text" data-container="body" data-title="Enter File Name" class="editableSharedName">' + name + '</a>' +
                '</h5>');
        });
    }

    // make each element editable
    $('.editableName').each(function(index, element){
        $(element).editable();
    });
    $('.editableSharedName').each(function(index, element){
        $(element).editable();
    });

    // Add hover to each file
    $('.hoverFile').each(function(index, element){
        if (element.id != currentFile) {
            $(element)
                .hover(
                    function () {
                        $(this).css('background-color', '#eeeeee');
                    },
                    function () {
                        $(this).css('background-color', 'transparent');
                    });
        } else {
            $(element).css({'background-color': '#3e3e3b', 'color': 'white'});
        }
    });

    $('.nonSharedFile').each(function(index, element) {
        $(element).on('click', function (e) {
            if ($(e.target).is('a')) {
                e.preventDefault();
                return;
            }
            openFile(element.id);
        });
    });

    $('.sharedFile').each(function(index, element) {
        $(element).on('click', function (e) {
            if ($(e.target).is('a')) {
                e.preventDefault();
                return;
            }
            openSharedFile(shared[element.id], element.id);
        });
    });

    // on fileName change, save value to memory
    $('.editableName').on('save', function(event, params) {
        var ref = firebase.database().ref( firebase.auth().currentUser.uid + '/files/' + event.target.id );
        ref.update({'name' : params.newValue});
    });

    $('.editableSharedName').on('save', function(event, params) {
        var fileKey = event.target.id;
        var fileUID = shared[fileKey];

        var ref = firebase.database().ref( fileUID + '/files/' + fileKey );
        ref.update({'name' : params.newValue});
    });
}

function openFile(key){
    window.location = '?uid=' + firebase.auth().currentUser.uid + '&file=' + key;
}

function openSharedFile(user, key){
    window.location = '?uid=' + user + '&file=' + key;
}

$('#downloadBtn').on('click', function(){
    saveFile();
});

$('#newFileButton').on('click', function(){
    window.location = window.location.pathname;
});