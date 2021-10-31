const { io } = require('../api/http');
const sendMessage = require('../utils/sendMessage');

const users = {};

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected`);
  users[socket.id] = socket.id.slice(0, 16);

  socket.on('nickname', (nickname) => {
    users[socket.id] = nickname;

    socket.emit('nickname', users[socket.id]);
    io.emit('listUsers', Object.values(users));
  });

  socket.on('message', async ({ nickname, chatMessage }) => {
    await sendMessage({ nickname, chatMessage, io, users });
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log(`Client ${socket.id} disconnected`);
    io.emit('listUsers', Object.values(users));
  });

  socket.emit('nickname', users[socket.id]);
  io.emit('listUsers', Object.values(users));
});
