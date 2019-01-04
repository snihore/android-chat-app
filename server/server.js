const express = require('express');
const socketIO = require('socket.io');

const path = require('path');
const http = require('http');

const pathPublic = path.join(__dirname, '/../', '/public');
const port = process.env.PORT || 3000;

var app = express();
app.use(express.static(pathPublic));
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection', (socket)=>{
    console.log(`Client is connected ...`);

    socket.on('disconnect', ()=>{
        console.log(`Client is disconnected ...`);
    });

    socket.on('createMessage', (message)=>{
        io.emit('displayMessage', {
            from: message.from,
            text: message.text
        });
    });
});


server.listen(port, ()=>{
    console.log(`Server listen on port ${port}`);
});