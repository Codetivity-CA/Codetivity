# Code Editor

## Real-time collaborative web-based code editor (Name TBD)
[Website Link  →](https://abhathal.github.io/Code-Editor)

### Short description with features:
- Our project will be a real-time collaborative web-based code editor. It will allow multiple users to view and edit the same document. The editor will feature syntax highlighting for a variety of programming languages and a selection of themes to choose from. 
- Users will be able to share a URL with collaborators to allow them to join the workspace. Users will also be able to create and login to an account in order to store their files in the cloud. 
- There will also be a comment box to allow collaborators to write notes and comments without interfering with the code itself. Desktop and mobile alerts will notify users to code edits or new comments for Chrome/Firefox.

### Elaboration:
- The core functionality of our application is the code editor itself (including syntax highlighting) and the real-time collaborative function (real-time edits and shared URLs). Both of these will be achieved by implementing Firepad (https://firepad.io). Firepad is an open source collaborative text editor that can be implemented in web applications. Firepad utilizes the web application platform Firebase (https://firebase.google.com), which takes care of the back-end and database. Firebase allows the real-time syncing for the code editor. With Firebase taking the place of our back-end functionality, a separate front-end framework will be used in place of a full-stack framework such as Grails (https://grails.org). Our project will use AngularJS (https://angularjs.org) as our front-end framework. We will use AngularFire (https://angularfire2.com) to integrate Firebase with AngularJS. AngularFire is the officially supported AngularJS binding for Firebase.

- Firebase allows user accounts, authentication, and provides cloud storage which will allow for our accounts and file storage features. We will the chrome.notification API (https://developer.chrome.com/apps/notifications) for Chrome alerts and the Mozilla Notification API (https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API) for Firefox alerts. A combination of Javascript, HTML, CSS and AngularJS will be used for the themes of our project/web-page. Firebase also provides real-time web-chat functionality, although how exactly this can be integrated with our web-page must be determined. A alternative web-chat API is Disqus (https://disqus.com/api/docs/) which can be integrated into our web-page.

### Advanced Feature(s)
- An advanced feature we are proposing is video conferencing integrated into the code editor. The WebRTC API (https://webrtc.org/) allows for video and audio chat in modern HTML5 browsers (Chrome/Firefox). A challenge will be figuring how to integrate this API with our AngularJS front-end and Firebase back-end. It may also be necessary to utilize a different back-end framework such as Node.js in order to effectively integrate video conferencing. Through consulting with our TA and further research, the feasibility of video conferencing will be determined. None of the core functionality of our project depends on this advanced feature.

Copyright © 2017 Bhathal, Arvinder; Friesen, Nicholas Dylan; Gilchrist, Adam Robert; Gleason, Daniel B; He, Yifan; Kozak, Heather Anne; Madrzyk, Alexander Dominic; Maroofzadeh, Zagros
