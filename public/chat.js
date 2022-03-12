const socket = io();

// DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

send.addEventListener('click', () => {
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    })
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
})

socket.on('chat:message', (data) => {
    actions.innerHTML = '';
  output.innerHTML += `<p><b>${data.username}<b>: <i>${data.message}</i></p>`;  
  message.value = '';
})

socket.on('chat:typing',(text) => {
    actions.innerHTML = `<p>${text}</p>`;
})