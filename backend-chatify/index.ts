import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { usersDb } from './database/users';

import {
  ClientToServerEvents,
  ServerToClientEvents,
} from './@types/typesSocketIo';

const app = express();
const httpServer = createServer(app);

const io = new Server<ClientToServerEvents, ServerToClientEvents>(httpServer, {
  cors: {
    origin: 'http://localhost:3000/',
  },
});

io.on('connection', (socket) => {
  const user = socket.handshake.auth.user;
  const id = socket.id;
  socket.broadcast.emit('replayMessage', { name: id, message: 'connected!' }); // send all users user connected
  usersDb.push({ id, user }); // add user to database when connect
  io.emit('onlineUser', usersDb);
  socket.on('message', ({ name, message }) => {
    io.emit('replayMessage', { name, message });
  });

  socket.on('disconnect', () => {
    const userIndex = usersDb.indexOf({ id, user }); // delete the user that disconnected
    usersDb.splice(userIndex, 1);
    io.emit('onlineUser', usersDb);
    io.emit('replayMessage', { name: id, message: 'disconnected' });
  });
});

httpServer.listen(4000, function () {
  console.log('listening on port 4000');
});
