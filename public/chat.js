const socket = io();

// DOM
let message = document.getElementById('message');
let username = document.getElementById('username');
let send = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

send.addEventListener('click', () => {
    if(username.value && message.value) {
        socket.emit('chat:message', {
            username: username.value,
            message: message.value
        })
    }
})

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
})

socket.on('chat:message', (data) => {
  actions.innerHTML = '';
  output.innerHTML += `<p> >> <b>${data.username}<b>: <span>${data.message}</span></p>`;  
  message.value = '';
})

socket.on('chat:typing',(text) => {
    actions.innerHTML = `<p>${text}</p>`;
})