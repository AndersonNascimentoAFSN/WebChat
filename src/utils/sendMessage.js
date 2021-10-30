const moment = require('moment');
const postsModel = require('../models');

module.exports = async ({ socketId, nickname, chatMessage, io, users }) => {
  if (!socketId) {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    await postsModel.createPosts({ chatMessage, nickname });
    io.emit('message', message);
    return;
  }
  const nickName = users[socketId];
  const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
  const message = `${timestamp} - ${nickName}: ${chatMessage}`;
  await postsModel.createPosts({ chatMessage, nickname });
  io.emit('message', message);
};