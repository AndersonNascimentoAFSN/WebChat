const messagesModel = require('../../models');

module.exports = async (_req, res) => {
  const messages = await messagesModel.getAllMessages();
  res.render('chat', { messages });
};