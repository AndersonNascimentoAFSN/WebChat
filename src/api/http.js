require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const path = require('path');
const { Server } = require('socket.io');
const route = require('../routes');

const app = express();

const serverHttp = http.createServer(app);

const options = {
  cors: {
    origin: process.env.BACKEND_URL,
    methods: ['GET', 'POST'],
  },
};

const io = new Server(serverHttp, options);

app.use(cors());

app.use(express.static(path.join(__dirname, '..', '..', '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', '/views'));

app.use('/', route.messagesRoutes);

module.exports = {
  io, serverHttp,
};