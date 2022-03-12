const path = require('path');
const express = require('express');
const socketIo = require('socket.io');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

// static files
app.use(express.static(path.join(__dirname, 'public')))

// app start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

const io = socketIo(server);

// sockets
io.on('connect', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    })

    socket.on('chat:typing', (username) => {
        socket.broadcast.emit('chat:typing', `${username} is typing...`);
    })
})