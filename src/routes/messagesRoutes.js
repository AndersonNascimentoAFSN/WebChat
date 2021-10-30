const express = require('express');
const postsController = require('../controllers');

const route = express.Router();

route.get('/', postsController.getAllMessages);

module.exports = route;