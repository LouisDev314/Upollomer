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
    // clear input
    e.target.elements.msg.value = '';
    // e.target.elements.msg.focus();
});

socket.on('self-connected', message => {
    message.text = 'You joined the chatroom';
    appendMessage(message);
});

socket.on('message', message => {
    appendMessage(message);
    // let the message scroll
    chatMessages.scrollTop = chatMessages.scrollHeight;

});

socket.on('creator-connected', message => {
    message.text = '{Username} joined the chatroom';
    appendMessage(message);
});

socket.on('creator-disconnected', message => {
    message.text = '{Username} left the chatroom';
    appendMessage(message);
});

function appendMessage(message) {
    const messageElement = document.createElement('div');
    // FIXME: change the innerText here base on the vid
    messageElement.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    chatMessages.append(messageElement);
}