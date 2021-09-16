// connect to the io server through host URL to get an individual socket from it
// so the socket will know anything from the io server on the client side
const socket = io();

const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');

// intercept the form submit/page post to server which leads to refresh of the page
chatForm.addEventListener('submit', e => {
    e.preventDefault();
    // neater than DOM to retrieve messages, target the current element
    const message = e.target.elements.msg.value;
    // emit this message to the server
    socket.emit('chat-message', message);
    e.target.elements.msg.value = '';
});

socket.on('self-connected', message => {
    appendMessage(message);
});

socket.on('message', message => {
    appendMessage(message);
});

socket.on('creator-connected', socketId => {
    // appendMessage(`${username} joined the chat`);
    console.log(socketId + ' has joined the chatroom');
});

socket.on('creator-disconnected', socketId => {
    // appendMessage(username);
    console.log(socketId + ' has left the chatroom');
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    // FIXME: change the innerText here bae on the vid
    messageElement.innerHTML = `<p class="meta">Name <span>3:00pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    chatMessages.append(messageElement);
}