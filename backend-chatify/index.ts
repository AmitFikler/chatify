import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer);

io.on('connection', (socket) => {
  socket.on('message', ({ name, message }) => {
    io.emit('replayMessage', { name, message });
  });

  socket.on('disconnect', () => {
    io.emit('replayMessage', { name: 'wow', message: 'render' });
  });
});

httpServer.listen(4000, function () {
  console.log('listening on port 4000');
});
