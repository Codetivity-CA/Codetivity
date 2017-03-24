

function ChatApp(){

    this.messageList = document.getElementById('messages');
    this.messageForm = document.getElementById('message-form');
    this.messageInput = document.getElementById('message2');
    this.submitButton = document.getElementById('message-form-button');

    this.messageForm.addEventListener('submit', this.saveMessage.bind(this));

    var buttonTogglingHandler = this.toggleButton.bind(this);
    this.messageInput.addEventListener('keyup', buttonTogglingHandler);
    this.messageInput.addEventListener('change', buttonTogglingHandler);

    this.auth = firebase.auth();
    this.database = firebase.database();
    this.storage = firebase.storage();


}

ChatApp.prototype.loadMessages = function(){
    this.messageRef = this.database.ref('message/');
    this.messageRef.off();

    var setMessage = function(data){
        var val = data.val();
        this.displayMessage(data.key, val.name, val.text);
    }.bind(this);

    this.messageRef.limitToLast(20).on('child_added', setMessage);
    this.messageRef.limitToLast(20).on('child_changed', setMessage);
};

ChatApp.prototype.saveMessage = function(e){
    e.preventDefault();
    if(this.messageInput.value){
        alert(messageRef);
        messageRef.push({
            test: "fdgfdhgfhf"
        }).then(function(){
            ChatApp.resetTextField(this.messageInput);
            this.toggleButton();
        }.bind(this)).catch(function(error){
            console.error('Error writing to database', error);
        });
    }
};

ChatApp.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
        '<div class="spacing"></div>' +
        '<div class="message"></div>' +
        '<div class="name"></div>' +
     '</div>';

ChatApp.prototype.displayMessage = function(key, name, text){
    var div = document.getElementById(key);

    if(!div){
        var container = document.createElement('div');
        container.innerHTML = ChatApp.MESSAGE_TEMPLATE;
        div = container.firstChild;
        div.setAttribute('id',key);
        this.messageList.appendChild(div);
    }

    div.querySelector('.name').textContent = name;
    var messageElement = div.querySelector('.message');
    if(text){
        messageElement.textContent = text;
        messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');

    }
    setTimeout(function() {div.classList.add('visible')}, 1);
    this.messageList.scrollTop = this.messageList.scrollHeight;
    this.messageInput.focus();
};

ChatApp.resetTextField = function(element){
    element.value = '';
    element.parentNode.MaterialTextfield.boundUpdateCalssesHandler();
};

ChatApp.prototype.toggleButton = function(){
    if(this.messageInput.value){
        this.submitButton.removeAttribute('disabled');
    }else{
        this.submitButton.setAttribute('disabled', 'true');
    }


};

// window.onload = function() {
//     window.chatapp = new ChatApp();
//     alert("rtes");
// };
