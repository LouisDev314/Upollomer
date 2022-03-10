// <% if (locals.category) { %>
//     <% for (let key in category) { %>
//         <option value="<%= key %>"><%= key %></option>
//     <% } %>
// <% } %>

// <% if (locals.category) { %>
//     <% Object.values(category)[0].forEach(genre => { %> 
//         <option value="<%= genre %>"><%= genre %></option>
//     <% }) %>
// <% } %>

// io.on('connection', socket => {
//     socket.on('new-creator', username => {
//         creators[socket.id] = username;
//         socket.broadcast.emit('creator-connected', username);
//     });
//     socket.on('send-chat-message', message => {
//         // broadcast the message to all sockets connected except sender
//         socket.broadcast.emit('chat-message', {
//             message: message,
//             username: creators[socket.id]
//         });
//     });
//     // disconnect is fixed
//     socket.on('disconnect', () => {
//         socket.broadcast.emit('user-disconnected', creators[socket.id]);
//         delete creators[socket.id];
//     });
// });

// const messageForm = document.getElementById('send-container');
// const messageInput = document.getElementById('message-input');
// const messageContainer = document.getElementById('message-container');

// const username = prompt('Username:');
// appendMessage('You joined the chat');
// socket.emit('new-creator', username);

// // intercept the form submit/page post to server which leads to refresh of the page
// messageForm.addEventListener('submit', e => {
//     e.preventDefault();
//     const message = messageInput.value;
//     appendMessage(`You: ${message}`);
//     // send information from client to server
//     socket.emit('send-chat-message', message);
//     messageInput.value = '';
// });

// // socket listen to an event
// socket.on('chat-message', data => {
//     appendMessage(`${data.username}: ${data.message}`);
// });