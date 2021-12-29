import express from 'express';
import { Server } from 'socket.io';
const app = express();
const http = require('http').createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>();

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
