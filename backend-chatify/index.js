"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
io.on('connection', (socket) => {
    socket.on('message', ({ name, message }) => {
        io.emit('messageBack', { name, message });
    });
    socket.on('disconnect', () => {
        io.emit('messageBack', { name: 'wow', message: 'render' });
    });
});
http.listen(4000, function () {
    console.log('listening on port 4000');
});
