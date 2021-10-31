const moment = require('moment');
const postsModel = require('../models');

module.exports = async ({ nickname, chatMessage, io }) => {
    const timestamp = moment().format('DD-MM-YYYY HH:mm:ss A');
    const message = `${timestamp} - ${nickname}: ${chatMessage}`;
    await postsModel.createMessages({ chatMessage, nickname });
    io.emit('message', message);
};