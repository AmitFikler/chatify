"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const users_1 = require("./database/users");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: 'http://localhost:3000/',
    },
});
io.on('connection', (socket) => {
    const username = socket.handshake.auth.user;
    const id = socket.id;
    socket.broadcast.emit('replayMessage', {
        name: username,
        message: 'connected!',
    }); // send all users user connected
    users_1.usersDb.push({ id, username }); // add user to database when connect
    io.emit('onlineUser', users_1.usersDb);
    socket.on('message', ({ name, message, to }) => {
        if (!to) {
            io.emit('replayMessage', { name, message });
        }
        else {
            io.to([to, id]).emit('replayMessage', {
                name,
                message: '[private] ' + message,
            });
        }
    });
    socket.on('userTyping', ({ name, typing }) => {
        socket.broadcast.emit('userTypingReplay', { name, typing });
    });
    socket.on('disconnect', () => {
        const userIndex = users_1.usersDb.indexOf({ id, username }); // delete the user that disconnected
        users_1.usersDb.splice(userIndex, 1);
        io.emit('onlineUser', users_1.usersDb);
        io.emit('replayMessage', { name: username, message: 'disconnected' });
    });
});
httpServer.listen(4000, function () {
    console.log('listening on port 4000');
});
