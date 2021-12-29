import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { usersDb } from './database/users';

const app = express();
const httpServer = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: 'http://localhost:3000/',
  },
});

io.on('connection', (socket) => {
  const id = socket.id;
  socket.broadcast.emit('replayMessage', { name: id, message: 'connected!' }); // send all users user connected
  usersDb.push({ id }); // add user to database when connect
  socket.on('message', ({ name, message }) => {
    io.emit('replayMessage', { name, message });
  });

  socket.on('disconnect', () => {
    const userIndex = usersDb.indexOf({ id }); // delete the user that disconnected
    usersDb.splice(userIndex, 1);
    io.emit('replayMessage', { name: id, message: 'disconnected' });
  });
});

httpServer.listen(4000, function () {
  console.log('listening on port 4000');
});
