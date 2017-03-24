/**
 * Created by alexmadrzyk on 3/21/17.
 */

/**
 * NOTE: There's a "your files" view, and a "shared with you" view.
 * - We need a nice way to show both.
 * - It would be cool if the 'Files Shared with You' header could stack ontop of the 'Your Files' header when you scroll that far down
 */

/**
 * This creates the array called 'files'. Use this array to populate your file view.
 */
var yourFiles = [];
var sharedWithYou = [];
for (var i = 1; i < 26; i++){
    yourFiles.push('File' + i);
    sharedWithYou.push('Shared' + i);
}

/**
 * This uses jQuery (note the '$' sign):
 * - First it waits for the document to load (you can't populate the page until the div has been displayed)
 * - Then it gets a reference to the file div
 * - Lastly it loops through your file array, and appends an h6 element to the end of the div's contents
 */

$(function(){
    var fileDiv = $('#left');

    fileDiv.append('<div><div id="yourFilesHeader" class="section-header" data-stickonscroll="yourFilesHeader" data-stickyType="element">' +
        '<h2>Your Files</h2>' +
        '</div></div>');

    for (var i = 0; i < yourFiles.length; i++){
        fileDiv.append('<h5>' + ' <i class="material-icons">description</i> ' + yourFiles[i] + '</h5>');
    }

    fileDiv.append('<div><div id="sharedWithYouHeader" class="section-header" data-stickonscroll="sharedWithYouHeader" data-stickyType="element">' +
        '<h2>Files Shared with You</h2>' +
        '</div></div>');

    for (i = 0; i < sharedWithYou.length; i++){
        fileDiv.append('<h5>' + ' <i class="material-icons">description</i> ' + sharedWithYou[i] + '</h5>');
    }
});

